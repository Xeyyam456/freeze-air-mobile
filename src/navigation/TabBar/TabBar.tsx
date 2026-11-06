import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarItem from "@navigation/TabBarItem";
import { TABS } from "@shared/config/tabs";
import useOpenTasksCount from "@shared/hooks/useOpenTasksCount";
import { styles } from "./TabBar.styles";

// Aşağıya yapışıq tünd tab bar (üst künclər yuvarlaq, nazik kənar xətti); tablar: shared/config/tabs
function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const openTasks = useOpenTasksCount();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) + 4 }]}>
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const onPress = () => {
          const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
        };
        const tab = TABS[route.name as keyof typeof TABS];
        const badge = route.name === "TasksTab" ? openTasks : 0;
        return <TabBarItem key={route.key} icon={tab.icon} label={tab.label} focused={focused} badge={badge} onPress={onPress} />;
      })}
    </View>
  );
}

export default TabBar;
