import { Pressable, Text, View } from "react-native";
import MonthNav from "@screens/protected/attendance/components/MonthNav";
import { monthDays } from "@shared/utils/helpers/attendance";
import { monthLead } from "@shared/utils/helpers/attendanceView";
import { styles } from "./RangeCalendar.styles";
import type { RangeCalendarProps } from "./RangeCalendar.types";

const WEEK = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];

// Tarix aralığı seçimi (native paket yox): 1-ci toxunuş başlanğıc, 2-ci bitmə; yenidən toxunanda təzədən başlayır.
// Bazar günü solğun (iş günü deyil, saya düşmür), bu gün çərçivəli
function RangeCalendar({ month, today, from, to, onMonth, onPick }: RangeCalendarProps) {
  const days = monthDays(month);
  const slots: (string | null)[] = [...Array.from({ length: monthLead(month) }, () => null), ...days];
  while (slots.length % 7) slots.push(null);
  const weeks = Array.from({ length: slots.length / 7 }, (_, i) => slots.slice(i * 7, i * 7 + 7));
  const end = to ?? from;

  return (
    <View style={styles.wrap}>
      <MonthNav month={month} isCurrent={false} onShift={onMonth} />
      <View style={styles.week}>{WEEK.map((w) => <Text key={w} style={styles.weekday}>{w}</Text>)}</View>
      {weeks.map((row, i) => (
        <View key={i} style={styles.week}>
          {row.map((d, j) => {
            if (!d) return <View key={j} style={styles.cell} />;
            const edge = d === from || d === end;
            const inside = !!from && !!end && d > from && d < end;
            const sunday = j === 6;
            return (
              <Pressable key={d} onPress={() => onPick(d)}
                style={[styles.cell, styles.day, inside && styles.inside, edge && styles.edge, d === today && !edge && styles.today]}>
                <Text style={[styles.num, sunday && styles.sunday, (edge || inside) && styles.numOn]}>{Number(d.slice(8))}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default RangeCalendar;
