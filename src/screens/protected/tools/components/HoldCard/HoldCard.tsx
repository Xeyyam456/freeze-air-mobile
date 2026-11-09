import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmModal from "@shared/components/ConfirmModal";
import { CheckIcon, PackageIcon, TrashIcon, UndoIcon, WrenchIcon } from "@shared/icons";
import { stamp } from "@shared/utils/leaves";
import { showQty, unitOf } from "@shared/utils/tools";
import { c } from "@theme/colors";
import { styles } from "./HoldCard.styles";
import type { HoldCardProps } from "./HoldCard.types";

// "Məndə olanlar" sətri: ad, nə vaxtdan, miqdar, vəziyyət; «Qaytar» (təsdiqlənmişdə) və ya gözləyən qaytarmada «Geri götür» (təsdiqlə). memo: FlashList sətri
function HoldCard({ hold: h, returning, selected, canSelect, onToggle, onReturn, onCancel }: HoldCardProps) {
  const [ask, setAsk] = useState(false);
  const t = h.tools;
  if (!t) return null;
  const material = t.kind === "material";
  const days = Math.floor((Date.now() - new Date(h.taken_at).getTime()) / 86400000);
  const st = !h.received_at ? (h.disputed_at ? { text: "«Almadım» dedin", color: c.danger } : { text: "Təsdiqlə ↑", color: c.orange })
    : returning ? { text: "Qaytarma gözləyir", color: c.violet } : { text: "Məndədir", color: c.ok };
  const sending = !!returning && returning.id < 0;
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        {canSelect ? <Pressable onPress={() => onToggle(h)} hitSlop={8} style={[styles.box, selected && styles.boxOn]} accessibilityLabel="Seç">{selected ? <CheckIcon size={14} color={c.white} /> : null}</Pressable> : null}
        <View style={styles.tile}>{material ? <PackageIcon size={18} color={c.ok} /> : <WrenchIcon size={18} color={c.primary} />}</View>
        <View style={styles.text}>
          <Text style={styles.name} numberOfLines={2}>{t.name}</Text>
          <Text style={styles.meta}>götürmüşəm {stamp(h.taken_at)} · {days <= 0 ? "bu gün" : `${days} gün`}</Text>
        </View>
        <Text style={styles.qty}>{showQty(h.quantity, unitOf(t), t)}</Text>
      </View>
      <View style={styles.foot}>
        <View style={styles.state}><View style={[styles.dot, { backgroundColor: st.color }]} /><Text style={[styles.stateText, { color: st.color }]}>{sending ? "Göndərilir" : st.text}</Text></View>
        {returning && !sending ? (
          <Pressable onPress={() => setAsk(true)} style={styles.btn} accessibilityLabel="Geri götür"><TrashIcon size={14} color={c.danger} /><Text style={[styles.btnText, { color: c.danger }]}>Geri götür</Text></Pressable>
        ) : h.received_at && !returning ? (
          <Pressable onPress={() => onReturn(h)} style={styles.btn} accessibilityLabel="Qaytar"><UndoIcon size={14} color={c.primary} /><Text style={styles.btnText}>Qaytar</Text></Pressable>
        ) : null}
      </View>
      {ask && returning ? (
        <ConfirmModal title="Sorğu geri götürülsün?" icon={TrashIcon} confirmTitle="Geri götür" danger onClose={() => setAsk(false)}
          text="Qaytarma sorğusu ləğv olunacaq." onConfirm={() => onCancel(returning)} />
      ) : null}
    </View>
  );
}

export default memo(HoldCard);
