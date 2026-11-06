import { type BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "@typings/navigation";
import PanelStackNavigator from "@navigation/PanelStackNavigator";
import TabBar from "@navigation/TabBar";
import AnnouncementsScreen from "@screens/protected/announcements/components/AnnouncementsScreen";
import MoreScreen from "@screens/protected/more/components/MoreScreen";
import usePanelLive from "@screens/protected/panel/hooks/usePanelLive";
import TasksScreen from "@screens/protected/tasks/components/TasksScreen";
import ToolsScreen from "@screens/protected/tools/components/ToolsScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

// tabBar render funksiyası modul səviyyəsində sabit olmalıdır (komponentin özünü ötürmək hook-ları pozur)
function renderTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

// Giriş edəndən sonrakı əsas naviqator. Realtime kanalı burada bir dəfə açılır (bütün tablar üçün).
function MainTabNavigator() {
  usePanelLive();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, animation: "shift" }} tabBar={renderTabBar}>
      <Tab.Screen name="PanelTab" component={PanelStackNavigator} />
      <Tab.Screen name="TasksTab" component={TasksScreen} />
      <Tab.Screen name="ToolsTab" component={ToolsScreen} />
      <Tab.Screen name="AnnouncementsTab" component={AnnouncementsScreen} />
      <Tab.Screen name="MoreTab" component={MoreScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
