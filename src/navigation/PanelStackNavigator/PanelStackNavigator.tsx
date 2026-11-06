import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { PanelStackParamList } from "@typings/navigation";
import AttendanceCalendarScreen from "@screens/protected/attendance/components/AttendanceCalendarScreen";
import AttendanceScreen from "@screens/protected/attendance/components/AttendanceScreen";
import PanelScreen from "@screens/protected/panel/components/PanelScreen";

const Stack = createNativeStackNavigator<PanelStackParamList>();

// Panel tabının stack-i: Panel → Davamiyyət (hero kartının küncündən) → ustanın təqvimi. Realtime: MainTabNavigator
function PanelStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="PanelMain" component={PanelScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="AttendanceCalendar" component={AttendanceCalendarScreen} />
    </Stack.Navigator>
  );
}

export default PanelStackNavigator;
