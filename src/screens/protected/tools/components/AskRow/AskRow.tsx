import { memo } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { CheckIcon } from "@shared/icons";
import { fmt, isPacked, parseQty, round2 } from "@shared/utils/tools";
import UnitToggle from "@screens/protected/tools/components/UnitToggle";
import { c } from "@theme/colors";
import { styles } from "./AskRow.styles";
import type { AskRowProps } from "./AskRow.types";

// "Alət istə" siyahısının sətri: işarə, ad, depoda neçə var; işarələnəndə miqdar + (qablı materialda) balon/kq seçimi.
// Artıq istənilmişi (gözləyən) yenidən istəmək olmur. Depoda olmayanı da istəmək olar. memo
function AskRow({ tool: t, asked, qty, byPack, onToggle, onQty, onByPack }: AskRowProps) {
  const on = qty !== undefined;
  const material = t.kind === "material";
  const packed = isPacked(t);
  const n = parseQty(qty ?? "");
  const valid = n > 0 && (material || Number.isInteger(n));
  const stock = t.available > 0 ? `depoda ${fmt(t.available)} ${material ? t.unit : "ədəd"}` : "depoda yoxdur (yenə istəmək olar)";
  return (
    <View style={[styles.row, asked && styles.off]}>
      <Pressable disabled={asked} onPress={onToggle} style={styles.main} accessibilityLabel={t.name}>
        <View style={[styles.box, on && styles.boxOn]}>{on ? <CheckIcon size={14} color={c.white} /> : null}</View>
        <View style={styles.text}>
          <Text style={styles.name} numberOfLines={2}>{t.name}</Text>
          <Text style={[styles.sub, { color: asked ? c.muted : t.available > 0 ? c.ok : c.orange }]}>{asked ? "artıq istəmisən: gözləyir" : stock}</Text>
        </View>
      </Pressable>
      {on ? (
        <View style={styles.qtyWrap}>
          <View style={styles.qtyRow}>
            <TextInput value={qty} onChangeText={onQty} keyboardType="decimal-pad" selectTextOnFocus style={[styles.input, !valid && styles.bad]} accessibilityLabel={`${t.name}: miqdar`} />
            {packed ? <UnitToggle value={byPack} onChange={onByPack} on={t.pack_name} off={t.unit} /> : <Text style={styles.unit}>{material ? t.unit : "ədəd"}</Text>}
          </View>
          {packed && byPack && valid ? <Text style={styles.conv}>= {fmt(round2(n * t.pack_size))} {t.unit}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

export default memo(AskRow);
