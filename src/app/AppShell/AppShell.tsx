import { NavigationContainer } from "@react-navigation/native";
import type { Session } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import useNotificationTaps from "@app/hooks/useNotificationTaps";
import usePushRegistration from "@app/hooks/usePushRegistration";
import { flushPendingUrl, navigationRef } from "@navigation/refs/navigationRef";
import { toastConfig } from "@shared/utils/helpers/toast";
import { navigationTheme } from "@theme/navigationTheme";
import RootNavigator from "@navigation/RootNavigator";

// Providers-in altında: naviqasiya konteyneri, status bar (açıq yazı, tünd fon), tost, push (qeydiyyat + toxunuş)
function AppShell({ session }: { session: Session | null }) {
  usePushRegistration(session?.user.id);
  useNotificationTaps();
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer ref={navigationRef} theme={navigationTheme} onReady={flushPendingUrl} onStateChange={flushPendingUrl}>
        <RootNavigator session={session} />
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={56} />
    </>
  );
}

export default AppShell;
