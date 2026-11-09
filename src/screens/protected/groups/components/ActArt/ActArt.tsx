import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { styles } from "./ActArt.styles";

// "Aktlar" ikonu (illüstrasiya): ağ akt kağızı (qatlanmış künc, sətirlər, mavi imza) + yaşıl "təsdiq" möhürü.
// Canlı: kağız yavaş üzür, möhür hər ~4 saniyədə bir "basılır" (qalxır, yayla enir); ekran görünmürsə dayanır
function ActArt() {
  const focused = useIsFocused();
  const f = useSharedValue(0);
  const s = useSharedValue(0);
  useEffect(() => {
    if (!focused) { cancelAnimation(f); cancelAnimation(s); return; }
    f.value = withRepeat(withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.sin) }), -1, true);
    s.value = withRepeat(withSequence(withDelay(2600, withTiming(1, { duration: 180 })), withSpring(0, { damping: 7, stiffness: 220 }), withTiming(0, { duration: 900 })), -1, false);
    return () => { cancelAnimation(f); cancelAnimation(s); };
  }, [focused, f, s]);
  const paper = useAnimatedStyle(() => ({ transform: [{ translateY: -2 * f.value }, { rotate: `${-5 + 2 * f.value}deg` }] }));
  const stamp = useAnimatedStyle(() => ({ transform: [{ scale: 1 + 0.35 * s.value }, { rotate: `${-14 + 10 * s.value}deg` }, { translateY: -5 * s.value }] }));

  return (
    <View style={styles.box}>
      <Animated.View style={[styles.paper, paper]}>
        <Svg width={34} height={42} viewBox="0 0 34 42">
          <Path d="M4 1 H24 L33 10 V38 A3 3 0 0 1 30 41 H4 A3 3 0 0 1 1 38 V4 A3 3 0 0 1 4 1 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />
          <Path d="M24 1 V7 A3 3 0 0 0 27 10 H33 Z" fill="#cbd5e1" />
          <Rect x={6} y={9} width={13} height={2.4} rx={1.2} fill="#0f172a" opacity={0.8} />
          <Rect x={6} y={15} width={21} height={1.8} rx={0.9} fill="#94a3b8" />
          <Rect x={6} y={20} width={18} height={1.8} rx={0.9} fill="#94a3b8" />
          <Rect x={6} y={25} width={20} height={1.8} rx={0.9} fill="#94a3b8" />
          <Path d="M6 35 C8 31 10 37 12 33 C13.5 30 15 36 17.5 33.5" fill="none" stroke="#2563eb" strokeWidth={1.6} strokeLinecap="round" />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.stamp, stamp]}>
        <Svg width={22} height={22} viewBox="0 0 22 22">
          <Circle cx={11} cy={11} r={10} fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth={2} />
          <Circle cx={11} cy={11} r={6.8} fill="none" stroke="#10b981" strokeWidth={1} strokeDasharray="1.6 1.6" />
          <Path d="M7.3 11.2 L9.9 13.6 L14.8 8.6" fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Animated.View>
    </View>
  );
}

export default ActArt;
