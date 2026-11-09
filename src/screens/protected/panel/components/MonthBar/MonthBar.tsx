import { memo, useEffect } from "react";
import { View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { styles } from "./MonthBar.styles";
import type { MonthBarProps } from "./MonthBar.types";

// Ayın bir günü (sütun): iş varsa hündürlük saya mütənasib; bu gün tam vurğu rəngində + işıq, keçən günlər solğun,
// işsiz gün kiçik nöqtə, gələcək gün çox sönük nöqtə. Açılışda soldan sağa ardıcıl böyüyür (UI thread). memo
function MonthBar({ height, index, state }: MonthBarProps) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(index * 18, withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }));
  }, [index, p]);
  const grow = useAnimatedStyle(() => ({ height: Math.max(3, height * p.value) }));
  if (state === "future" || state === "zero") {
    return <View style={styles.slot}><View style={[styles.dot, state === "future" && styles.future]} /></View>;
  }
  return (
    <View style={styles.slot}>
      {state === "today" ? <View style={[styles.glow, { height: height + 10 }]} /> : null}
      <Animated.View style={[styles.bar, state === "today" ? styles.today : styles.past, grow]} />
    </View>
  );
}

export default memo(MonthBar);

