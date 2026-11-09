import { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { styles } from "./TabIndicator.styles";
import type { TabIndicatorProps } from "./TabIndicator.types";

const SPRING = { damping: 18, stiffness: 190, mass: 0.8 };

// Bütün tab bar üçün TƏK aktiv göstərici: ikonun arxasındakı həb + bar-ın üst kənarında xətt (aktiv tabın rəngində) tablar arasında yayla sürüşür.
// Yolda həb bir az uzanır, yerinə çatanda yığılır (göz keçidi izləyir). UI thread-də (reanimated); ilk ölçüdə animasiyasız yerləşir
function TabIndicator({ index, tabWidth, colors, softs }: TabIndicatorProps) {
  const x = useSharedValue(index * tabWidth);
  const stretch = useSharedValue(1);
  const prevW = useRef(tabWidth);
  useEffect(() => {
    if (!prevW.current || prevW.current !== tabWidth) { x.value = index * tabWidth; prevW.current = tabWidth; return; } // ilk ölçü / ekran dönməsi: sıçrayışsız
    x.value = withSpring(index * tabWidth, SPRING);
    stretch.value = withSequence(withTiming(1.3, { duration: 110 }), withSpring(1, { damping: 12, stiffness: 200 }));
  }, [index, tabWidth, x, stretch]);
  // Rəng mövqeyə bağlıdır: həb sürüşərkən bir tabın rəngindən digərinə yumşaq keçir
  const range = colors.map((_, i) => i * tabWidth);
  const pill = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { scaleX: stretch.value }] }));
  const pillColor = useAnimatedStyle(() => ({ backgroundColor: range.length > 1 && tabWidth ? interpolateColor(x.value, range, softs) : softs[0] }));
  const lineColor = useAnimatedStyle(() => ({ backgroundColor: range.length > 1 && tabWidth ? interpolateColor(x.value, range, colors) : colors[0] }));
  const line = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { scaleX: 2 - stretch.value }] }));
  if (!tabWidth) return null;
  return (
    <>
      <Animated.View pointerEvents="none" style={[styles.track, styles.pillTrack, { width: tabWidth }, pill]}><Animated.View style={[styles.pill, pillColor]} /></Animated.View>
      <Animated.View pointerEvents="none" style={[styles.track, styles.lineTrack, { width: tabWidth }, line]}>
        <View style={styles.glow} />
        <Animated.View style={[styles.line, lineColor]} />
      </Animated.View>
    </>
  );
}

export default TabIndicator;
