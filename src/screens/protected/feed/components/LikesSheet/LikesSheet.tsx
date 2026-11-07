import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { CloseIcon } from "@shared/icons";
import { queryKeys } from "@shared/queries/queryKeys";
import { REACTIONS } from "@shared/config/reactions";
import { fetchFeedLikers } from "@shared/services/feedMeta.service";
import { c } from "@theme/colors";
import type { FeedLiker } from "@typings/feed";
import { styles } from "./LikesSheet.styles";
import type { LikesSheetProps } from "./LikesSheet.types";

function Row({ p, first }: { p: FeedLiker; first: boolean }) {
  return (
    <View style={[styles.row, !first && styles.line]}>
      <Avatar name={p.name} photo={p.photo} size={40} />
      <View style={styles.text}><Text style={styles.name} numberOfLines={1}>{p.name}</Text><Text style={styles.role} numberOfLines={1}>{p.role}</Text></View>
    </View>
  );
}

// Kimlər reaksiya verib: hər reaksiya növü ayrı bölmə (ad, şəkil, ixtisas/vəzifə). Canlı: feed_likes Realtime. X, fon və "geri" bağlayır
function LikesSheet({ logId, group, onClose }: LikesSheetProps) {
  const q = useQuery({ queryKey: [...queryKeys.feed(group), "likers", logId], queryFn: () => fetchFeedLikers(logId, group) });
  const list = q.data ?? [];
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          <Text style={styles.title}>Reaksiyalar</Text>
          {q.isPending ? <ActivityIndicator color={c.muted} style={{ marginVertical: 20 }} />
            : !list.length ? <Text style={styles.empty}>Hələ reaksiya yoxdur.</Text>
            : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {REACTIONS.map((s) => {
                  const rows = list.filter((p) => p.kind === s.kind);
                  if (!rows.length) return null;
                  return (
                    <View key={s.kind}>
                      <View style={styles.head}><Text style={styles.emoji}>{s.emoji}</Text><Text style={styles.count}>{rows.length}</Text></View>
                      {rows.map((p, i) => <Row key={p.id} p={p} first={i === 0} />)}
                    </View>
                  );
                })}
              </ScrollView>
            )}
        </View>
      </View>
    </Modal>
  );
}

export default LikesSheet;
