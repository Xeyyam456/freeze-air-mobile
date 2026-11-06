import { useState } from "react";
import { type LayoutChangeEvent, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { smoothPath } from "@shared/utils/chart";
import { monthName, todayBaku } from "@shared/utils/time";
import { c } from "@theme/colors";
import { H, styles } from "./MonthTrend.styles";
import type { MonthTrendProps } from "./MonthTrend.types";

// Ayın trendi: bu günə qədər gün-gün işlərim — hamar xətt + altında qradiyent dolğu, sonda parlayan nöqtə
function MonthTrend({ overview }: MonthTrendProps) {
  const [w, setW] = useState(0);
  const today = todayBaku();
  const days = overview.month.filter((d) => d.day <= today);
  const max = Math.max(1, ...days.map((d) => d.count));
  const total = overview.month.length;
  const pts: [number, number][] = days.map((d, i) => [
    total > 1 ? (i / (total - 1)) * w : 0,
    H - 6 - (d.count / max) * (H - 18),
  ]);
  const last = pts[pts.length - 1];
  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);

  return (
    <Animated.View entering={FadeInDown.delay(220).duration(450)} style={styles.card}>
      <View style={styles.head}>
        <View>
          <Text style={styles.kicker}>{monthName(today).toUpperCase()}</Text>
          <Text style={styles.title}>{overview.monthTotal} iş · {overview.activeDays} gün</Text>
        </View>
        {overview.monthTotal > 0 && <Text style={styles.max}>gündə ən çox {max}</Text>}
      </View>
      <View onLayout={onLayout} style={{ height: H }}>
        {w > 0 && days.length > 0 && (
          <Svg width={w} height={H}>
            <Defs>
              <LinearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={c.primary} stopOpacity={0.35} />
                <Stop offset="1" stopColor={c.primary} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Path d={smoothPath(pts, H, true)} fill="url(#area)" />
            <Path d={smoothPath(pts, H)} stroke={c.primary} strokeWidth={2.5} fill="none" strokeLinecap="round" />
            {last && <Circle cx={last[0]} cy={last[1]} r={9} fill={c.primary} opacity={0.2} />}
            {last && <Circle cx={last[0]} cy={last[1]} r={4.5} fill={c.white} stroke={c.primary} strokeWidth={2} />}
          </Svg>
        )}
      </View>
      <View style={styles.axis}>
        {[1, 10, 20, total].map((n) => <Text key={n} style={styles.tick}>{n}</Text>)}
      </View>
    </Animated.View>
  );
}

export default MonthTrend;
