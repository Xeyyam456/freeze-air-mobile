import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import { styles } from "./MediaArt.styles";

const EASE = Easing.inOut(Easing.sin);

// "Görülən işlər" ikonu (illüstrasiya): arxada şəkil kartı (səma, dağ, günəş), önündə video kartı (qırmızı oynat düyməsi).
// Canlı: kartlar yavaş yırğalanır, oynat düyməsi nəbz edir; ekran görünmürsə dayanır
function MediaArt() {
  const focused = useIsFocused();
  const t = useSharedValue(0);
  useEffect(() => {
    if (!focused) { cancelAnimation(t); return; }
    t.value = withRepeat(withTiming(1, { duration: 2600, easing: EASE }), -1, true);
    return () => cancelAnimation(t);
  }, [focused, t]);
  const back = useAnimatedStyle(() => ({ transform: [{ rotate: `${-12 + 4 * t.value}deg` }, { translateY: -1.5 * t.value }] }));
  const front = useAnimatedStyle(() => ({ transform: [{ rotate: `${9 - 4 * t.value}deg` }, { translateY: 1.5 * t.value }] }));
  const play = useAnimatedStyle(() => ({ transform: [{ scale: 1 + 0.14 * t.value }] }));

  return (
    <View style={styles.box}>
      <Animated.View style={[styles.photo, back]}>
        <Svg width={34} height={28} viewBox="0 0 34 28">
          <Defs>
            <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#7dd3fc" /><Stop offset="1" stopColor="#0ea5e9" /></LinearGradient>
          </Defs>
          <Rect x={0.5} y={0.5} width={33} height={27} rx={5} fill="url(#sky)" stroke="#e0f2fe" strokeWidth={1.5} />
          <Circle cx={25} cy={8} r={3.6} fill="#fde047" />
          <Path d="M2 25 L12 13 L19 21 L23 17 L32 25 Z" fill="#22c55e" />
          <Path d="M12 13 L19 21 L15 25 L2 25 Z" fill="#16a34a" />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.video, front]}>
        <Svg width={32} height={26} viewBox="0 0 32 26">
          <Rect x={0.5} y={0.5} width={31} height={25} rx={5} fill="#1e293b" stroke="#475569" strokeWidth={1.2} />
          <Rect x={4} y={4} width={3} height={2} rx={0.6} fill="#64748b" />
          <Rect x={4} y={20} width={3} height={2} rx={0.6} fill="#64748b" />
          <Rect x={25} y={4} width={3} height={2} rx={0.6} fill="#64748b" />
          <Rect x={25} y={20} width={3} height={2} rx={0.6} fill="#64748b" />
        </Svg>
        <Animated.View style={[styles.play, play]}>
          <Svg width={14} height={14} viewBox="0 0 14 14">
            <Circle cx={7} cy={7} r={7} fill="#ef4444" />
            <Path d="M5.5 4.3 L10 7 L5.5 9.7 Z" fill="#ffffff" />
          </Svg>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default MediaArt;
