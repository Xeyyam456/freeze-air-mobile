import { Text, View } from "react-native";
import { CheckIcon } from "@shared/icons";
import { monthLead } from "@shared/utils/attendanceView";
import { c } from "@theme/colors";
import { CELL, LEGEND, WEEK, styles } from "./CalendarGrid.styles";
import type { CalendarGridProps } from "./CalendarGrid.types";

// Ayın təqvimi (bazar ertəsindən, web CalendarGrid): işdə yaşıl ✓, icazəli bənövşəyi, gəlmədi qırmızı, bu gün çərçivəli
function CalendarGrid({ month, days }: CalendarGridProps) {
  const lead = monthLead(month);
  // Həftə sətirləri: əvvəldə boş xanalar, sonda 7-yə tamamlanır
  const slots = [...Array.from({ length: lead }, () => null), ...(days ?? Array.from({ length: 30 }, () => null))];
  while (slots.length % 7) slots.push(null);
  const weeks = Array.from({ length: slots.length / 7 }, (_, i) => slots.slice(i * 7, i * 7 + 7));

  return (
    <View style={styles.wrap}>
      <View style={styles.week}>
        {WEEK.map((w) => <Text key={w} style={styles.weekday}>{w}</Text>)}
      </View>
      {weeks.map((row, i) => (
        <View key={i} style={styles.week}>
          {row.map((d, j) => {
            if (!d) return <View key={j} style={[styles.cell, !days && i * 7 + j >= lead && styles.skeleton]} />;
            const num = Number(d.day.slice(8));
            return (
              <View key={d.day} style={[styles.cell, CELL[d.status]]}>
                {d.status === "present" && <CheckIcon size={13} color={c.white} strokeWidth={3} />}
                <Text style={[d.status === "present" ? styles.numSmall : styles.num, { color: CELL[d.status].color }]}>{num}</Text>
              </View>
            );
          })}
        </View>
      ))}
      <View style={styles.legend}>
        {LEGEND.map((l) => (
          <View key={l.s} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: CELL[l.s].backgroundColor }]} />
            <Text style={styles.legendText}>{l.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default CalendarGrid;
