import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring, ZoomIn, ZoomOut } from "react-native-reanimated";
import PulseDot from "@navigation/PulseDot";
import { c } from "@theme/colors";
import { styles } from "./TabBarItem.styles";
import type { TabBarItemProps } from "./TabBarItem.types";

// Bir tab: aktivdə ikonun arxasında yaylı açılan mavi həb, ikon və yazı vurğulanır; sağ yuxarıda rəqəm nişanı
function TabBarItem({ icon: Icon, label, focused, badge = 0, dot = false, onPress }: TabBarItemProps) {
  const pill = useAnimatedStyle(() => ({
    opacity: withSpring(focused ? 1 : 0, { damping: 18 }),
    transform: [{ scale: withSpring(focused ? 1 : 0.6, { damping: 14 }) }],
  }));
  return (
    <Pressable onPress={onPress} style={styles.item} hitSlop={6} accessibilityLabel={badge || dot ? `${label}, yeni var` : label}>
      <View style={styles.iconWrap}>
        <Animated.View style={[styles.pill, pill]} />
        <Icon size={25} color={focused ? c.primary : c.muted} strokeWidth={focused ? 2.4 : 2} />
        {badge > 0 && (
          <Animated.View entering={ZoomIn.springify().damping(14)} exiting={ZoomOut.duration(150)} style={styles.badge}>
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
