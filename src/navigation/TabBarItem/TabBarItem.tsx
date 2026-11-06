import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { c } from "@theme/colors";
import { styles } from "./TabBarItem.styles";
import type { TabBarItemProps } from "./TabBarItem.types";

// Bir tab: aktivdə ikonun arxasında yaylı açılan mavi həb, ikon və yazı vurğulanır
function TabBarItem({ icon: Icon, label, focused, onPress }: TabBarItemProps) {
  const pill = useAnimatedStyle(() => ({
    opacity: withSpring(focused ? 1 : 0, { damping: 18 }),
    transform: [{ scale: withSpring(focused ? 1 : 0.6, { damping: 14 }) }],
  }));
  return (
    <Pressable onPress={onPress} style={styles.item} hitSlop={6}>
      <View style={styles.iconWrap}>
        <Animated.View style={[styles.pill, pill]} />
        <Icon size={21} color={focused ? c.primary : c.muted} strokeWidth={focused ? 2.4 : 2} />
      </View>
      <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

export default TabBarItem;
