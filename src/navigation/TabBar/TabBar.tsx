import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { type NavigationState, StackActions } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarItem from "@navigation/TabBarItem";
import TabIndicator from "@navigation/TabIndicator";
import { TABS } from "@shared/config/tabs";
import useFeedUnread from "@shared/hooks/useFeedUnread";
import useOpenTasksCount from "@shared/hooks/useOpenTasksCount";
import useUnreadAnnouncements from "@shared/hooks/useUnreadAnnouncements";
import { styles } from "./TabBar.styles";

// Aşağıya yapışıq tünd tab bar (üst künclər yuvarlaq, nazik kənar xətti); tablar: shared/config/tabs.
// Aktiv göstərici (həb + üst xətt) bütün bar üçün təkdir və tablar arasında sürüşür (TabIndicator); eni onLayout ilə ölçülür
function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const openTasks = useOpenTasksCount();
  const unread = useUnreadAnnouncements();
  const newWork = useFeedUnread("work");
  const newAct = useFeedUnread("act");
  const groupsNew = newWork + newAct > 0; // Qruplar tabı: yeni iş/akt var → yanıb-sönən qırmızı nöqtə
  const [width, setWidth] = useState(0);
  const tabWidth = width ? (width - 8) / state.routes.length : 0; // paddingHorizontal 4 + 4
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) + 5 }]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)} accessibilityRole="tablist">
      <TabIndicator index={state.index} tabWidth={tabWidth} />
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        // Tab HƏMİŞƏ öz əsas ekranında açılır (istifadəçi): içində açılmış ekran (məs. Daha çox → Davamiyyət) qalıbsa əvvəl kökə qayıdır
        const onPress = () => {
          const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (e.defaultPrevented) return;
          const nested = route.state as NavigationState | undefined;
          if (nested?.key && nested.index > 0) navigation.dispatch({ ...StackActions.popToTop(), target: nested.key });
          if (!focused) navigation.navigate(route.name);
        };
        const tab = TABS[route.name as keyof typeof TABS];
        const badge = route.name === "TasksTab" ? openTasks : route.name === "AnnouncementsTab" ? unread : 0;
        return <TabBarItem key={route.key} icon={tab.icon} activeIcon={tab.active} label={tab.label} focused={focused} badge={badge} dot={route.name === "GroupsTab" && groupsNew} onPress={onPress} />;
      })}
    </View>
  );
}

export default TabBar;
