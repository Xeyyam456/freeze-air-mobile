import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";
import PulseDot from "@navigation/PulseDot";
import { c } from "@theme/colors";
import { styles } from "./TabBarItem.styles";
import type { TabBarItemProps } from "./TabBarItem.types";

// Bir tab: aktivdə DOLU ikon, passivdə xətli; basanda ikon yumşaq kiçilir, aktiv olanda bir dəfə yüngül sıçrayır; aktivdə ikon + yazı eyni vurğu rəngində.
// Aktiv həb burada deyil — TabIndicator bütün bar üçün təkdir və sürüşür. Sağ yuxarıda rəqəm nişanı və ya nəbz nöqtəsi
function TabBarItem({ icon: Line, activeIcon: Solid, label, focused, badge = 0, dot = false, onPress }: TabBarItemProps) {
  const s = useSharedValue(1);
  useEffect(() => {
    if (focused) s.value = withSequence(withTiming(1.14, { duration: 120 }), withSpring(1, { damping: 10, stiffness: 220 }));
  }, [focused, s]);
  const icon = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));
  const color = focused ? c.primary : c.muted;
  const Icon = focused ? Solid : Line; // aktivdə dolu ikon, passivdə xətli
  const a11y = badge > 0 ? `${label}, ${badge} yeni` : dot ? `${label}, yeni var` : label;
  return (
    <Pressable onPress={onPress} onPressIn={() => { s.value = withTiming(0.88, { duration: 90 }); }} onPressOut={() => { s.value = withSpring(1, { damping: 12, stiffness: 260 }); }}
      style={styles.item} hitSlop={6} accessibilityRole="tab" accessibilityState={{ selected: focused }} accessibilityLabel={a11y}>
      <View style={styles.iconWrap}>
        <Animated.View style={icon}><Icon size={24} color={color} strokeWidth={2} /></Animated.View>
        {badge > 0 && (
          <Animated.View key={badge > 9 ? "9+" : badge} entering={ZoomIn.springify().damping(12)} exiting={ZoomOut.duration(150)} style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 9 ? "9+" : badge}</Text>
          </Animated.View>
        )}
        {dot && <PulseDot />}
      </View>
      <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

export default TabBarItem;
