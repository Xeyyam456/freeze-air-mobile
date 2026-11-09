import { Text, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { CheckIcon } from "@shared/icons";
import { azn, FUEL_LABEL, fmtKm } from "@shared/utils/helpers/fuel";
import { c } from "@theme/colors";
import { GREEN, styles } from "./DayResult.styles";
import type { DayResultProps } from "./DayResult.types";

// Günün yekunu (axşam km yazılandan sonra): getdiyin km, yanacaq pulu, litr; km × sərf / 100 × qiymət bazada hesablanır
function DayResult({ row }: DayResultProps) {
  return (
    <View style={styles.card}>
      <GradientBg colors={GREEN} radius={16} />
      <View style={styles.head}>
        <View style={styles.check}><CheckIcon size={12} color={c.white} strokeWidth={3} /></View>
        <Text style={styles.kicker}>GÜNÜN YEKUNU</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>GETDİN</Text>
          <Text style={styles.big}>{row.km ?? "—"} <Text style={styles.unit}>km</Text></Text>
        </View>
        <View style={[styles.half, styles.divider]}>
          <Text style={styles.label}>YANACAQ PULU</Text>
          <Text style={styles.big}>{row.cost != null ? azn(Number(row.cost)) : "—"}</Text>
        </View>
      </View>
      <Text style={styles.foot}>
        {fmtKm(row.start_km)} → {fmtKm(row.end_km ?? 0)} km
        {row.liters != null ? ` · ${Number(row.liters).toFixed(2)} L${row.fuel_type ? ` ${(FUEL_LABEL[row.fuel_type] ?? "").toLowerCase()}` : ""}` : ""}
        {row.fuel_price != null ? ` · ${row.fuel_price} ₼/L` : ""}
      </Text>
    </View>
  );
}

export default DayResult;
