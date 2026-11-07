import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { CloseIcon } from "@shared/icons";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchFeedLikers } from "@shared/services/feed.service";
import { c } from "@theme/colors";
import { styles } from "./LikesSheet.styles";
import type { LikesSheetProps } from "./LikesSheet.types";

// Paylaşımı kimlər bəyənib: ad, şəkil, ixtisas/vəzifə. Canlı: feed_likes Realtime (açıqkən başqası bəyənəndə siyahı yenilənir). X, fon və "geri" bağlayır
function LikesSheet({ logId, group, onClose }: LikesSheetProps) {
  const q = useQuery({ queryKey: [...queryKeys.feed(group), "likers", logId], queryFn: () => fetchFeedLikers(logId, group) });
  const list = q.data ?? [];
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          <View style={styles.head}><Text style={styles.emoji}>👍</Text><Text style={styles.title}>Bəyənənlər{list.length ? ` · ${list.length}` : ""}</Text></View>
          {q.isPending ? <ActivityIndicator color={c.muted} style={{ marginVertical: 20 }} />
            : !list.length ? <Text style={styles.empty}>Hələ bəyənən yoxdur.</Text>
            : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {list.map((p, i) => (
                  <View key={p.id} style={[styles.row, i > 0 && styles.line]}>
                    <Avatar name={p.name} photo={p.photo} size={40} />
                    <View style={styles.text}><Text style={styles.name} numberOfLines={1}>{p.name}</Text><Text style={styles.role} numberOfLines={1}>{p.role}</Text></View>
                  </View>
                ))}
              </ScrollView>
            )}
        </View>
      </View>
    </Modal>
  );
}

export default LikesSheet;
