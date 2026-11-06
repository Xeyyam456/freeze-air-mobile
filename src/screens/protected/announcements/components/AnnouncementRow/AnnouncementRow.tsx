import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmModal from "@shared/components/ConfirmModal";
import { MegaphoneIcon, TrashIcon } from "@shared/icons";
import { isFresh, timeText } from "@shared/utils/announcements";
import { c } from "@theme/colors";
import { styles } from "./AnnouncementRow.styles";
import type { AnnouncementRowProps } from "./AnnouncementRow.types";

// Bir elan (web AnnouncementRow): ikon (son 24 saat — dolu mavi), başlıq + "Yeni", mətn, müəllif · saat.
// Günün elanları bir kartda (first/last künclər). Öz elanını müəllif silir (təsdiqlə). memo: FlashList sətri
function AnnouncementRow({ item: a, first, last, mine, onDelete }: AnnouncementRowProps) {
  const [confirm, setConfirm] = useState(false);
  const fresh = isFresh(a.created_at);
  const pending = a.id < 0; // göndərilir (optimistik)
  return (
    <View style={[styles.row, first && styles.first, last && styles.last, !first && styles.divider, pending && styles.pending]}>
      <View style={[styles.icon, fresh && styles.iconFresh]}>
        <MegaphoneIcon size={16} color={fresh ? c.white : c.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{a.title}</Text>
        {a.body ? <Text style={styles.text}>{a.body}</Text> : null}
        <View style={styles.meta}>
          {fresh && <Text style={styles.fresh}>Yeni</Text>}
          <Text style={styles.metaText}>{a.created_by_name ?? "Rəhbərlik"} · {timeText(a.created_at)}</Text>
        </View>
      </View>
      {mine && !pending && (
        <Pressable onPress={() => setConfirm(true)} hitSlop={8} style={styles.trash} accessibilityLabel="Elanı sil">
          <TrashIcon size={16} color={c.danger} />
        </Pressable>
      )}
      {confirm && (
        <ConfirmModal title="Elan silinsin?" icon={TrashIcon} confirmTitle="Sil" danger onClose={() => setConfirm(false)}
          text="Elan siyahıdan silinəcək; artıq göndərilmiş bildiriş geri qayıtmır." onConfirm={() => onDelete(a.id)} />
      )}
    </View>
  );
}

export default memo(AnnouncementRow);
