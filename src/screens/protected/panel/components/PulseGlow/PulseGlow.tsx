import { useEffect } from "react";
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { styles } from "./PulseGlow.styles";
import type { PulseGlowProps } from "./PulseGlow.types";

// Davamlı "nəfəs alan" işıq ləkəsi (hero kartın küncündə). Azaldılmış hərəkətdə sabit qalır.
function PulseGlow({ color, size = 220 }: PulseGlowProps) {
  const reduced = useReducedMotion();
  const t = useSharedValue(0);

  useEffect(() => {
    if (!reduced) t.value = withRepeat(withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [reduced, t]);

  const anim = useAnimatedStyle(() => ({
    opacity: 0.18 + t.value * 0.17,
    transform: [{ scale: 0.9 + t.value * 0.2 }],
  }));

  return <Animated.View pointerEvents="none" style={[styles.glow, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }, anim]} />;
}

export default PulseGlow;
