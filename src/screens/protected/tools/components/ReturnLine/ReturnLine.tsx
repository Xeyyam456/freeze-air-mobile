import { Text, TextInput, View } from "react-native";
import { calcReturn, isPacked, showQty, unitOf } from "@shared/utils/helpers/tools";
import UnitToggle from "@screens/protected/tools/components/UnitToggle";
import { c } from "@theme/colors";
import { styles } from "./ReturnLine.styles";
import type { ReturnLineProps } from "./ReturnLine.types";

// Qaytarma panelinin bir sətri: alətdə say; materialda "qaytarıram" (+ balon/kq) və "qalanı: işlətdim | məndə qalır"; altda nəticənin xülasəsi
function ReturnLine({ hold: h, draft: d, onChange }: ReturnLineProps) {
  const t = h.tools;
  if (!t) return null;
  const calc = calcReturn(h, d);
  return (
    <View style={styles.line}>
      <Text style={styles.name} numberOfLines={2}>{t.name}</Text>
      <Text style={styles.sub}>səndə {showQty(h.quantity, unitOf(t), t)}</Text>
      {t.kind === "material" ? (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Qaytarıram</Text>
            <TextInput value={d.ret} onChangeText={(v) => onChange({ ...d, ret: v })} keyboardType="decimal-pad" placeholder="0" placeholderTextColor={c.faint} style={[styles.input, calc.over && styles.bad]} />
            {isPacked(t) ? <UnitToggle value={d.byPack} onChange={(v) => onChange({ ...d, byPack: v })} on={t.pack_name} off={t.unit} /> : <Text style={styles.unit}>{t.unit}</Text>}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Qalanı</Text>
            <UnitToggle value={d.restUsed} onChange={(v) => onChange({ ...d, restUsed: v })} on="işlətdim" off="məndə qalır" />
          </View>
        </>
      ) : (
        <View style={styles.row}>
          <Text style={styles.label}>Say</Text>
          <TextInput value={d.qty} onChangeText={(v) => onChange({ ...d, qty: v })} keyboardType="number-pad" selectTextOnFocus style={[styles.input, calc.over && styles.bad]} />
          <Text style={styles.unit}>ədəd</Text>
        </View>
      )}
      <Text style={[styles.hint, calc.over && styles.hintBad]}>{calc.hint}</Text>
    </View>
  );
}

export default ReturnLine;
