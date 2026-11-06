import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import type { RootStackParamList } from "@typings/navigation";
import LoginScreen from "@screens/auth/components/LoginScreen";
import MainTabNavigator from "@navigation/MainTabNavigator";
import TaskNoteScreen from "@screens/protected/taskNote/components/TaskNoteScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Auth flow: sessiya varsa Main, yoxdursa Login. Giriş/çıxışda ekran özü dəyişir (navigate çağırmaq lazım deyil).
function RootNavigator({ session }: { session: Session | null }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      {session ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="TaskNote" component={TaskNoteScreen} options={{ animation: "slide_from_bottom" }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
