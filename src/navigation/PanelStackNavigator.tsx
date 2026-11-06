import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { PanelStackParamList } from "@typings/navigation";
import PanelScreen from "@screens/protected/panel/components/PanelScreen";

const Stack = createNativeStackNavigator<PanelStackParamList>();

// Panel tabının stack-i (sonra iş detalı kimi ekranlar bura əlavə olunacaq). Realtime: MainTabNavigator
function PanelStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PanelMain" component={PanelScreen} />
    </Stack.Navigator>
  );
}

export default PanelStackNavigator;
