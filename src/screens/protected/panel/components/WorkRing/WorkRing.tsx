import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { c, gradients } from "@theme/colors";
import { styles } from "./WorkRing.styles";
import type { WorkRingProps } from "./WorkRing.types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const DAY_MIN = 9 * 60; // iş günü 09:00–18:00

// Bugünkü iş vaxtı halqası (Apple Fitness üslubu): 9 saata görə dolur, qradiyent xətt, ortada "4:12"
function WorkRing({ minutes, size = 148, stroke = 12 }: WorkRingProps) {
  const r = (size - stroke) / 2;
  const len = 2 * Math.PI * r;
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(Math.min(1, minutes / DAY_MIN), { duration: 900, easing: Easing.out(Easing.cubic) });
  }, [minutes, p]);

  const props = useAnimatedProps(() => ({ strokeDashoffset: len * (1 - p.value) }));
  const h = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, "0");

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={gradients.accent[0]} />
            <Stop offset="1" stopColor={c.ok} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.line} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={len}
          animatedProps={props}
          opacity={minutes > 0 ? 1 : 0}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.time}>{h}:{m}</Text>
        <Text style={styles.of}>/ 9 saat</Text>
      </View>
    </View>
  );
}

export default WorkRing;
