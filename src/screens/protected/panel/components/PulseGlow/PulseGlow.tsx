import { useEffect } from "react";
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { styles } from "./PulseGlow.styles";
import type { PulseGlowProps } from "./PulseGlow.types";

// Davamlı "nəfəs alan" yumşaq işıq (hero kartın küncündə). Kənarları radial qradiyentlə sönür (kəskin dairə yox).
// Svg bir dəfə çəkilir; animasiya yalnız opacity/scale — UI thread-də, JS render yoxdur. Azaldılmış hərəkətdə sabit.
function PulseGlow({ color, size = 260 }: PulseGlowProps) {
  const reduced = useReducedMotion();
  const t = useSharedValue(0);

  useEffect(() => {
    if (!reduced) t.value = withRepeat(withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [reduced, t]);

  const anim = useAnimatedStyle(() => ({
    opacity: 0.55 + t.value * 0.45,
    transform: [{ scale: 0.92 + t.value * 0.16 }],
  }));

  const r = size / 2;
  return (
    <Animated.View pointerEvents="none" style={[styles.glow, { width: size, height: size }, anim]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={0.32} />
            <Stop offset="0.45" stopColor={color} stopOpacity={0.12} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={r} cy={r} r={r} fill="url(#pulse)" />
      </Svg>
    </Animated.View>
  );
}

export default PulseGlow;
