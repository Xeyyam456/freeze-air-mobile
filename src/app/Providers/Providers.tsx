import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "@shared/api/queryClient";
import { persistOptions } from "@shared/api/queryStorage";
import { styles } from "./Providers.styles";
import type { ProvidersProps } from "./Providers.types";

// Bütün kontekstlər bir yerdə: keş (diskə yazılan), jest, klaviatura, təhlükəsiz sahə
function Providers({ children }: ProvidersProps) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <GestureHandlerRootView style={styles.root}>
        <KeyboardProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}

export default Providers;
