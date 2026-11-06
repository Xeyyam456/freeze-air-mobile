import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarItem from "@navigation/TabBarItem";
import { TABS } from "@navigation/tabConfig";
import { styles } from "./TabBar.styles";

// Aşağıda üzən tünd şüşəvari kart (kölgə); tablar: navigation/tabConfig
function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { bottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const onPress = () => {
          const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
        };
        const tab = TABS[route.name as keyof typeof TABS];
        return <TabBarItem key={route.key} icon={tab.icon} label={tab.label} focused={focused} onPress={onPress} />;
      })}
    </View>
  );
}

export default TabBar;
