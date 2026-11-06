import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";
import { pushTokenStore } from "@shared/api/storage";
import { PUSH_CHANNELS } from "@shared/config/push";
import { registerPushToken } from "@shared/services/push.service";
import { c } from "@theme/colors";

// App açıqkən gələn bildiriş də yuxarıda banner kimi görünsün (səs ilə)
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
});

// Kanal → icazə → Expo token. Android 13+: kanal olmadan icazə pəncərəsi çıxmır, ona görə əvvəl kanal.
async function getToken(): Promise<string | null> {
  if (!Device.isDevice) return null;
  if (Platform.OS === "android") {
    await Promise.all(PUSH_CHANNELS.map((ch) => Notifications.setNotificationChannelAsync(ch.id, {
      name: ch.name,
      description: ch.description,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 200, 250],
      lightColor: c.primary,
      showBadge: true,
    })));
  }
  let { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") ({ status } = await Notifications.requestPermissionsAsync());
  if (status !== "granted") return null;
  const projectId = Constants.easConfig?.projectId ?? Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    console.warn("push: EAS projectId yoxdur (app.json extra.eas.projectId) — token alınmadı");
    return null;
  }
  return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
}

// Giriş edən hər dəfə (app açılışında da) token bazaya yazılır — upsert, təkrar zərərsizdir; telefon hesab dəyişəndə token yeni sahibə keçir
function usePushRegistration(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;
    let alive = true;
    getToken()
      .then(async (token) => {
        if (!alive || !token) return;
        await registerPushToken(token, Platform.OS === "ios" ? "ios" : "android");
        pushTokenStore.set(token);
      })
      .catch((e: Error) => console.warn("push qeydiyyatı alınmadı:", e.message));
    return () => {
      alive = false;
    };
  }, [userId]);
}

export default usePushRegistration;
