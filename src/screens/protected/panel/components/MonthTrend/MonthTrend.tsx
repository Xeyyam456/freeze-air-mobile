import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { monthName, todayBaku } from "@shared/utils/time";
import MonthBar from "@screens/protected/panel/components/MonthBar";
import { H, styles } from "./MonthTrend.styles";
import type { MonthTrendProps } from "./MonthTrend.types";

// Ayın trendi: gün-gün sütunlar (Apple Fitness kimi). Xətt əvəzinə sütun: say diskretdir, hamar xətt sıfırın altına "batırdı".
// Bu gün vurğulu, işsiz/gələcək günlər nöqtə; açılışda sütunlar soldan sağa böyüyür. Altda 1 · 10 · 20 · son gün
function MonthTrend({ overview }: MonthTrendProps) {
  const today = todayBaku();
  const max = Math.max(1, ...overview.month.map((d) => d.count));
  const total = overview.month.length;
  const todayCount = overview.month.find((d) => d.day === today)?.count ?? 0;

  return (
    <Animated.View entering={FadeInDown.delay(220).duration(450)} style={styles.card}>
      <View style={styles.head}>
        <View>
          <Text style={styles.kicker}>{monthName(today).toUpperCase()}</Text>
          <Text style={styles.title}>{overview.monthTotal} iş · {overview.activeDays} gün</Text>
        </View>
        <View style={styles.side}>
          <Text style={styles.sideValue}>{todayCount}</Text>
          <Text style={styles.max}>bu gün · ən çox {max}</Text>
        </View>
      </View>
      <View style={[styles.chart, { height: H }]}>
        <View style={styles.guide} />
        {overview.month.map((d, i) => (
          <MonthBar key={d.day} index={i} height={(d.count / max) * (H - 8)}
            state={d.day > today ? "future" : d.day === today ? (d.count ? "today" : "zero") : d.count ? "past" : "zero"} />
        ))}
      </View>
      <View style={styles.axis}>
        {[1, 10, 20, total].map((n) => <Text key={n} style={styles.tick}>{n}</Text>)}
      </View>
    </Animated.View>
  );
}

export default MonthTrend;
