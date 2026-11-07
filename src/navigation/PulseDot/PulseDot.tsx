import { useEffect } from "react";
import { View } from "react-native";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";
import { styles } from "./PulseDot.styles";

// Rəqəmsiz qırmızı nöqtə: sonsuz "nəbz" animasiyası (UI thread, reanimated): ətrafında genişlənib sönən halqa + nöqtənin özü yüngül döyünür
function PulseDot() {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }), -1, false);
    return () => cancelAnimation(t);
  }, [t]);
  const ring = useAnimatedStyle(() => ({ opacity: 0.6 * (1 - t.value), transform: [{ scale: 1 + 1.8 * t.value }] }));
  const dot = useAnimatedStyle(() => ({ transform: [{ scale: 1 + 0.12 * Math.sin(t.value * Math.PI) }] }));
  return (
    <Animated.View entering={ZoomIn.springify().damping(14)} exiting={ZoomOut.duration(150)} style={styles.wrap} pointerEvents="none">
      <Animated.View style={[styles.ring, ring]} />
      <View style={styles.border}><Animated.View style={[styles.dot, dot]} /></View>
    </Animated.View>
  );
}

export default PulseDot;
