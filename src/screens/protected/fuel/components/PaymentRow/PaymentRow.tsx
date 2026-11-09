import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmModal from "@shared/components/ConfirmModal";
import { CheckIcon, CloseIcon } from "@shared/icons";
import { azn, dayName } from "@shared/utils/helpers/fuel";
import { c } from "@theme/colors";
import { styles } from "./PaymentRow.styles";
import type { PaymentRowProps } from "./PaymentRow.types";

// Şirkətin verdiyi yanacaq pulu: məbləğ · gün, qeyd; "Aldım" (təsdiqlə — geri alınmır) / "Almadım" (sonra "Aldım" olar).
// memo: FlashList sətri
function PaymentRow({ payment: p, onConfirm }: PaymentRowProps) {
  const [ask, setAsk] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.text}>
          <Text style={styles.amount}>{azn(Number(p.amount))} <Text style={styles.day}>· {dayName(p.day)}</Text></Text>
          {p.note ? <Text style={styles.note} numberOfLines={2}>{p.note}</Text> : null}
        </View>
        {p.status === "received" && <Text style={[styles.badge, styles.ok]}>✓ Aldım</Text>}
        {p.status === "disputed" && <Text style={[styles.badge, styles.bad]}>Almadım</Text>}
      </View>
      {p.status !== "received" && (
        <View style={styles.actions}>
          <Pressable onPress={() => setAsk(true)} style={[styles.btn, styles.btnOk]}>
            <CheckIcon size={15} color={c.white} strokeWidth={3} />
            <Text style={styles.btnOkText}>Aldım</Text>
          </Pressable>
          {p.status !== "disputed" && (
            <Pressable onPress={() => onConfirm(p.id, false)} style={[styles.btn, styles.btnNo]}>
              <CloseIcon size={15} color={c.danger} />
              <Text style={styles.btnNoText}>Almadım</Text>
            </Pressable>
          )}
        </View>
      )}
      {ask && (
        <ConfirmModal title="Pulu aldın?" icon={CheckIcon} confirmTitle="Bəli, aldım" onClose={() => setAsk(false)}
          text={`${azn(Number(p.amount))} · ${dayName(p.day)}\nTəsdiqdən sonra dəyişmək olmur.`} onConfirm={() => onConfirm(p.id, true)} />
      )}
    </View>
  );
}

export default memo(PaymentRow);
