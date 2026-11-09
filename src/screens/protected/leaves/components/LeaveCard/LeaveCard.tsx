import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmModal from "@shared/components/ConfirmModal";
import { CalendarOffIcon, TrashIcon } from "@shared/icons";
import { leaveRange, leaveWorkdays, stamp } from "@shared/utils/helpers/leaves";
import { STATUS, styles } from "./LeaveCard.styles";
import type { LeaveCardProps } from "./LeaveCard.types";

// Bir sorğu (web LeaveCard): solda vəziyyət zolağı, tarix · iş günü, səbəb, göndərilib/cavab vaxtı, vəziyyət nişanı.
// Aktivdə: təsdiqlənmiş → "Ehtiyac qalmadı", gözləyən → "Geri götür" (ikisi də təsdiqlə). memo: FlashList sətri
function LeaveCard({ leave: l, active, today, onGiveUp, onCancel }: LeaveCardProps) {
  const [ask, setAsk] = useState<"giveUp" | "cancel" | null>(null);
  const st = STATUS[l.status] ?? STATUS.pending;
  const ongoing = l.status === "approved" && l.date_from <= today && today <= l.date_to;
  const pending = l.id < 0;
  return (
    <View style={[styles.card, pending && styles.sending]}>
      <View style={[styles.bar, { backgroundColor: st.fg }]} />
      <View style={styles.body}>
        <View style={styles.head}>
          <Text style={styles.range}>{leaveRange(l)}</Text>
          <Text style={styles.days}>{leaveWorkdays(l)} iş günü</Text>
          <Text style={[styles.status, { color: st.fg, backgroundColor: st.bg }]}>{pending ? "Göndərilir" : st.text}</Text>
        </View>
        {ongoing && <Text style={styles.now}>İndi icazədəsən</Text>}
        <Text style={styles.reason} numberOfLines={2}>{l.reason || "Səbəb yazılmayıb"}</Text>
        <Text style={styles.meta}>Göndərilib: {stamp(l.created_at)}{l.decided_at ? `\nCavab: ${stamp(l.decided_at)}` : ""}</Text>
        {active && !pending && l.status === "approved" && (
          <Pressable onPress={() => setAsk("giveUp")} style={styles.action}><Text style={styles.actionText}>Ehtiyac qalmadı</Text></Pressable>
        )}
        {active && !pending && l.status === "pending" && (
          <Pressable onPress={() => setAsk("cancel")} style={[styles.action, styles.danger]}>
            <TrashIcon size={14} color={STATUS.rejected.fg} />
            <Text style={[styles.actionText, { color: STATUS.rejected.fg }]}>Geri götür</Text>
          </Pressable>
        )}
      </View>
      {ask === "giveUp" && (
        <ConfirmModal title="İcazə ləğv edilsin?" icon={CalendarOffIcon} confirmTitle="Ləğv et" danger onClose={() => setAsk(null)}
          text={ongoing ? "Keçmiş günlər icazəli qalır, bu gündən işə gəlməlisən." : "İcazə ləğv olunur, həmin günlərdə işdə olmalısan."}
          onConfirm={() => onGiveUp(l)} />
      )}
      {ask === "cancel" && (
        <ConfirmModal title="Sorğu geri götürülsün?" icon={TrashIcon} confirmTitle="Geri götür" danger onClose={() => setAsk(null)}
          text="Sorğu silinir, rəhbərliyə artıq görünməyəcək." onConfirm={() => onCancel(l)} />
      )}
    </View>
  );
}

export default memo(LeaveCard);
