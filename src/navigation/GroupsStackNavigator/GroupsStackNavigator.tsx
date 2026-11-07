import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { GroupsStackParamList } from "@typings/navigation";
import FeedScreen from "@screens/protected/feed/components/FeedScreen";
import GroupsScreen from "@screens/protected/groups/components/GroupsScreen";

const Stack = createNativeStackNavigator<GroupsStackParamList>();

// "Qruplar" tabının stack-i: qrup siyahısı → Görülən işlər / Aktlar lenti (eyni FeedScreen, qrup marşrut adından bilinir)
function GroupsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="GroupsMain" component={GroupsScreen} />
      <Stack.Screen name="WorkFeed" component={FeedScreen} />
      <Stack.Screen name="ActFeed" component={FeedScreen} />
    </Stack.Navigator>
  );
}

export default GroupsStackNavigator;
