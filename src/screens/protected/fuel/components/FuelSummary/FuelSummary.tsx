import { Text, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { azn, balanceText, dayName, fmtKm, PERIOD_TOTAL } from "@shared/utils/fuel";
import { c, gradients } from "@theme/colors";
import { styles, TONE } from "./FuelSummary.styles";
import type { FuelSummaryProps } from "./FuelSummary.types";

// Bu günün hesabatı (dövrdən asılı deyil) + seçilmiş dövrün yanacaq pulu; altda ayın balansı (alınan − sərf)
function FuelSummary({ f }: FuelSummaryProps) {
  const row = f.todayRow;
  const dot = !row ? c.faint : row.end_km == null ? c.orange : c.ok;
  const bal = balanceText(f.balance);
  const cells = [
    { label: "Ayda sərf", value: azn(f.month.cost), color: c.ink },
    { label: "Ayda aldığın", value: azn(f.month.paid), color: c.ink },
    { label: "Ayın balansı", value: `${f.balance > 0 ? "+" : ""}${azn(f.balance)}`, color: TONE[bal.tone] },
  ];
  return (
    <View style={styles.card}>
      <GradientBg colors={gradients.hero} radius={24} />
      <View style={styles.today}>
        <View style={styles.todayHead}>
          <View style={[styles.dot, { backgroundColor: dot }]} />
          <Text style={styles.kicker}>BU GÜN · {dayName(f.today).toUpperCase()}</Text>
        </View>
        <View style={styles.todayNums}>
          <Text style={styles.km}>{row?.km ?? 0} <Text style={styles.unit}>km</Text></Text>
          <Text style={styles.liters}>{row?.liters != null ? `${Number(row.liters).toFixed(2)} L` : "— L"}</Text>
          <Text style={styles.cost}>{row?.cost != null ? azn(Number(row.cost)) : "—"}</Text>
        </View>
        <Text style={styles.hint}>
          {!row ? "Bu gün hələ yazılmayıb: səhər spidometri yaz"
            : row.end_km == null ? `Açıqdır · səhər ${fmtKm(row.start_km)} km, axşam yaz`
            : `${fmtKm(row.start_km)} → ${fmtKm(row.end_km)} km${row.fuel_price != null ? ` · ${row.fuel_price} ₼/L` : ""}`}
        </Text>
      </View>
      <View style={styles.period}>
        <Text style={styles.kicker}>{PERIOD_TOTAL[f.period].toUpperCase()}</Text>
        <View style={styles.periodRow}>
          <Text style={styles.total}>{azn(f.total.cost)}</Text>
          <Text style={styles.chips}>{fmtKm(f.total.km)} km · {f.total.liters.toFixed(1)} L · {f.total.days}/{f.range.workdays} gün</Text>
        </View>
        <Text style={[styles.balance, { color: TONE[bal.tone] }]}>{bal.text} · {f.monthR.label}</Text>
        <View style={styles.cells}>
          {cells.map((x) => (
            <View key={x.label} style={styles.cell}>
              <Text style={styles.cellLabel} numberOfLines={1}>{x.label}</Text>
              <Text style={[styles.cellValue, { color: x.color }]} numberOfLines={1}>{x.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default FuelSummary;
