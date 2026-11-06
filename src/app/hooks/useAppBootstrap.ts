import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import useSession from "@app/hooks/useSession";

void SplashScreen.preventAutoHideAsync();

// Açılış: sessiya MMKV-dən oxunana qədər (bir anlıq) splash qalır, sonra gizlənir.
// Məlumat gözlənilmir: keş diskdən dərhal gəlir, ekran boş "Yüklənir" göstərmir.
function useAppBootstrap() {
  const session = useSession();
  const ready = session !== undefined;
  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);
  return { ready, session: session ?? null };
}

export default useAppBootstrap;
