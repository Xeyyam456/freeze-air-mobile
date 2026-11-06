import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { PanelStackParamList } from "@typings/navigation";
import PanelScreen from "@screens/protected/panel/components/PanelScreen";
import usePanelLive from "@screens/protected/panel/hooks/usePanelLive";

const Stack = createNativeStackNavigator<PanelStackParamList>();

// Usta paneli stack-i. Realtime kanalı burada bir dəfə açılır (giriş olan bütün müddətdə)
function PanelStackNavigator() {
  usePanelLive();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PanelMain" component={PanelScreen} />
    </Stack.Navigator>
  );
}

export default PanelStackNavigator;
