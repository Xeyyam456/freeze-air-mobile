import { useIsFocused, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ImageViewer from "@shared/components/ImageViewer";
import ScreenHeader from "@shared/components/ScreenHeader";
import useReload from "@shared/hooks/useReload";
import { SearchIcon } from "@shared/icons";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchAnnouncer } from "@shared/services/announcements.service";
import { markFeedSeen } from "@shared/stores/feedSeen";
import { feedRows, type FeedRow } from "@shared/utils/feed";
import CommentsSheet from "@screens/protected/feed/components/CommentsSheet";
import FeedCard from "@screens/protected/feed/components/FeedCard";
import LikesSheet from "@screens/protected/feed/components/LikesSheet";
import useFeed from "@screens/protected/feed/hooks/useFeed";
import useFeedReaction from "@screens/protected/feed/hooks/useFeedReaction";
import { c } from "@theme/colors";
import type { FeedGroup } from "@typings/feed";
import { styles } from "./FeedScreen.styles";

const TEXT: Record<FeedGroup, { title: string; sub: string; empty: string; unit: string }> = {
  work: { title: "Görülən işlər", sub: "Ustaların şəkil və videoları", empty: "Hələ görülən iş paylaşılmayıb.", unit: "iş" },
  act: { title: "Aktlar", sub: "Ustaların yüklədiyi aktlar", empty: "Hələ akt yüklənməyib.", unit: "akt" },
};

// İş lenti (WhatsApp qrupu kimi): usta tapşırıq qeydinə şəkil/video/akt yükləyəndə avtomatik burada görünür (usta adı + yer + birlikdə işləyənlər).
// Axtarış: yer, şirkət, usta, tarix. Şəkil → tam ekran, video/PDF → telefonun öz tətbiqi. 👍/👎 reaksiya, 💬 şərh (optimistik, canlı)
function FeedScreen() {
  const insets = useSafeAreaInsets();
  const group: FeedGroup = useRoute().name === "ActFeed" ? "act" : "work";
  const t = TEXT[group];
  const m = useFeed(group);
  const { refreshing, onRefresh } = useReload(m.reload);
  const react = useFeedReaction(group, m.me);
  const moderator = useQuery({ queryKey: queryKeys.announcer, queryFn: fetchAnnouncer, staleTime: 10 * 60_000 }).data?.canSend ?? false; // rəhbərlik
  const focused = useIsFocused();
  // Qrup açıqdırsa "baxıldı" indiki ana yazılır; məlumat yenilənəndə (yeni paylaşım, şərh, reaksiya) də — beləcə açıq qrupda gələn hadisə oxunmuş sayılır
  useEffect(() => { if (focused) markFeedSeen(group, new Date().toISOString()); }, [focused, m.posts, group]);
  const [reactors, setReactors] = useState<number | null>(null); // kimlər reaksiya verib: paylaşım
  const [commenting, setCommenting] = useState<number | null>(null); // şərhlər: paylaşım
  const [viewer, setViewer] = useState<{ images: string[]; start: number } | null>(null);
  const rows = useMemo(() => feedRows(m.posts, t.unit), [m.posts, t.unit]); // gün başlıqları + paylaşımlar

  return (
    <View style={styles.flex}>
      <FlashList
        data={rows}
        keyExtractor={(r: FeedRow) => r.key}
        getItemType={(r: FeedRow) => r.kind}
        renderItem={({ item: r }) => r.kind === "day" ? <View style={styles.dayRow}><Text style={styles.day}>{r.label}</Text></View> : (
          <FeedCard post={r.post} mine={r.post.employeeId === m.me} onReact={react} onReactors={(p) => setReactors(p.logId)}
            onComments={(p) => setCommenting(p.logId)} onImages={(images, start) => setViewer({ images, start })} />
        )}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title={t.title} sub={m.total ? `${t.sub} · ${m.total}` : t.sub} />
            <View style={styles.search}>
              <SearchIcon size={18} color={c.muted} />
              <TextInput value={m.query} onChangeText={m.setQuery} placeholder="Yer, usta və ya tarix axtar" placeholderTextColor={c.muted} style={styles.input} autoCorrect={false} />
            </View>
          </View>
        }
        ListEmptyComponent={m.error ? <ErrorState message="Lent yüklənmədi." onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : <Text style={styles.empty}>{m.query ? "Heç nə tapılmadı." : t.empty}</Text>}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
      {reactors !== null && <LikesSheet logId={reactors} group={group} onClose={() => setReactors(null)} />}
      {commenting !== null && <CommentsSheet logId={commenting} group={group} moderator={moderator} onClose={() => setCommenting(null)} />}
      {viewer && <ImageViewer images={viewer.images} start={viewer.start} onClose={() => setViewer(null)} />}
    </View>
  );
}

export default FeedScreen;
