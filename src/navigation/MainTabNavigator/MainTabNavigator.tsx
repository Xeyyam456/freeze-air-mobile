import { type BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "@typings/navigation";
import GroupsStackNavigator from "@navigation/GroupsStackNavigator";
import PanelStackNavigator from "@navigation/PanelStackNavigator";
import TabBar from "@navigation/TabBar";
import AnnouncementsScreen from "@screens/protected/announcements/components/AnnouncementsScreen";
import MoreStackNavigator from "@navigation/MoreStackNavigator";
import usePanelLive from "@screens/protected/panel/hooks/usePanelLive";
import TasksScreen from "@screens/protected/tasks/components/TasksScreen";

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
      <Tab.Screen name="GroupsTab" component={GroupsStackNavigator} />
      <Tab.Screen name="AnnouncementsTab" component={AnnouncementsScreen} />
      <Tab.Screen name="MoreTab" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
