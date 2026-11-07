import { useIsFocused, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import CommentsSheet from "@screens/protected/feed/components/CommentsSheet";
import FeedCard from "@screens/protected/feed/components/FeedCard";
import LikesSheet from "@screens/protected/feed/components/LikesSheet";
import useFeed from "@screens/protected/feed/hooks/useFeed";
import useFeedReaction from "@screens/protected/feed/hooks/useFeedReaction";
import { c } from "@theme/colors";
import type { FeedGroup, FeedPost } from "@typings/feed";
import { styles } from "./FeedScreen.styles";

const TEXT: Record<FeedGroup, { title: string; sub: string; empty: string }> = {
  work: { title: "Görülən işlər", sub: "Ustaların şəkil və videoları", empty: "Hələ görülən iş paylaşılmayıb." },
  act: { title: "Aktlar", sub: "Ustaların yüklədiyi aktlar", empty: "Hələ akt yüklənməyib." },
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
  // Qrup açıqdırsa ən yeni paylaşım "baxıldı" yazılır (yeni gələn də dərhal oxunmuş sayılır → qrup siyahısındakı say sıfırlanır)
  useEffect(() => { if (focused && m.latest) markFeedSeen(group, m.latest); }, [focused, m.latest, group]);
  const [reactors, setReactors] = useState<number | null>(null); // kimlər reaksiya verib: paylaşım
  const [commenting, setCommenting] = useState<number | null>(null); // şərhlər: paylaşım
  const [viewer, setViewer] = useState<{ images: string[]; start: number } | null>(null);

  return (
    <View style={styles.flex}>
      <FlashList
        data={m.posts}
        keyExtractor={(p: FeedPost) => String(p.logId)}
        renderItem={({ item }) => (
          <FeedCard post={item} mine={item.employeeId === m.me} onReact={react} onReactors={(p) => setReactors(p.logId)}
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
