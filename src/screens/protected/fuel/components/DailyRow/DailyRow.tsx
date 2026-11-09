import { memo } from "react";
import { Text, View } from "react-native";
import { azn, fmtKm, WEEKDAY_SHORT, weekdayOf } from "@shared/utils/helpers/fuel";
import { dayPayState } from "@shared/utils/helpers/fuelDebt";
import { styles } from "./DailyRow.styles";
import type { DailyRowProps } from "./DailyRow.types";

// Günlük hesab sətri: gün plitəsi, km + zolaq (dövrün ən uzun günü = 100%), sərf və ödəniş vəziyyəti
// (ayın pulları günlərə köhnədən yeniyə paylanır: ✓ ödənilib / X ₼ qalıb / verilməyib). O gün verilən pul — kiçik yazı
function DailyRow({ row: r, got, maxKm, today, pay }: DailyRowProps) {
  const isToday = r.day === today;
  const state = dayPayState(pay);
  const stateText = state === "paid" ? "✓ ödənilib" : state === "partial" ? `${azn(pay!.cost - pay!.covered)} qalıb` : state === "unpaid" ? "verilməyib" : null;
  return (
    <View style={[styles.row, isToday && styles.today]}>
      <View style={[styles.date, isToday && styles.dateToday]}>
        <Text style={[styles.dayNum, isToday && styles.onToday]}>{Number(r.day.slice(8))}</Text>
        <Text style={[styles.weekday, isToday && styles.onTodayDim]}>{WEEKDAY_SHORT[weekdayOf(r.day)]}</Text>
      </View>
      <View style={styles.mid}>
        <Text style={styles.km}>{r.km != null ? fmtKm(r.km) : "—"} <Text style={styles.unit}>km</Text></Text>
        <Text style={styles.sub} numberOfLines={1}>
          {fmtKm(r.start_km)} → {r.end_km != null ? fmtKm(r.end_km) : "axşam yazılmayıb"}{r.liters != null ? ` · ${Number(r.liters).toFixed(1)} L` : ""}
        </Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.max(3, ((r.km ?? 0) / maxKm) * 100)}%` }]} />
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.cost}>{r.cost != null ? azn(Number(r.cost)) : "—"}</Text>
        {stateText ? <Text style={[styles.state, styles[state!]]}>{stateText}</Text> : null}
        {got > 0 && <Text style={styles.got}>bu gün +{azn(got)}</Text>}
      </View>
    </View>
  );
}

export default memo(DailyRow);
