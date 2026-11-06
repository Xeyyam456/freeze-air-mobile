import { NavigationContainer } from "@react-navigation/native";
import type { Session } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "@shared/utils/toast";
import { navigationTheme } from "@theme/navigationTheme";
import RootNavigator from "@navigation/RootNavigator";

// Providers-in altında: naviqasiya konteyneri, status bar (açıq yazı, tünd fon), tost
function AppShell({ session }: { session: Session | null }) {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator session={session} />
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={56} />
    </>
  );
}

export default AppShell;
