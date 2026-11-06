import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import useReload from "@shared/hooks/useReload";
import AnnouncementForm from "@screens/protected/announcements/components/AnnouncementForm";
import AnnouncementRow from "@screens/protected/announcements/components/AnnouncementRow";
import AnnouncementsEmpty from "@screens/protected/announcements/components/AnnouncementsEmpty";
import useAnnouncementActions from "@screens/protected/announcements/hooks/useAnnouncementActions";
import useAnnouncements from "@screens/protected/announcements/hooks/useAnnouncements";
import useAnnouncementsSeen from "@screens/protected/announcements/hooks/useAnnouncementsSeen";
import { c } from "@theme/colors";
import type { AnnouncementRowItem } from "@typings/announcements";
import { styles } from "./AnnouncementsScreen.styles";

// Elanlar (web /elanlar): rəhbərliyin elanları günlərə görə; rəhbərlikdirsə yuxarıda göndərmə forması.
// CANLI: yeni/silinən elan Realtime ilə dərhal (usePanelLive); ekran açıq olanda hamısı oxundu (tab nişanı 0)
function AnnouncementsScreen() {
  const insets = useSafeAreaInsets();
  const a = useAnnouncements();
  const { send, remove } = useAnnouncementActions(a.me);
  const { refreshing, onRefresh } = useReload(a.reload);
  useAnnouncementsSeen();

  const renderItem = ({ item }: { item: AnnouncementRowItem }) =>
    item.kind === "day" ? <Text style={styles.day}>{item.label}</Text>
      : <AnnouncementRow item={item.item} first={item.first} last={item.last} mine={!!a.me && item.item.created_by === a.me} onDelete={remove} />;

  return (
    <View style={styles.flex}>
      <FlashList
        data={a.rows}
        keyExtractor={(r) => r.key}
        getItemType={(r) => r.kind}
        renderItem={renderItem}
        extraData={a.me}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Elanlar</Text>
            <Text style={styles.sub}>Rəhbərliyin bütün komandaya elanları</Text>
            {a.canSend && <AnnouncementForm onSend={send} />}
          </View>
        }
        ListEmptyComponent={a.error ? <ErrorState message="Elanlar yüklənmədi." onRetry={a.reload} />
          : a.ready ? <AnnouncementsEmpty /> : <ActivityIndicator color={c.muted} style={styles.loader} />}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default AnnouncementsScreen;
