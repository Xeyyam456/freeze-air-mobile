import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { openUrl } from "@navigation/refs/navigationRef";

// url: əvvəl content.data; Android-də app bağlı olanda bəzən boş gəlir → FCM remoteMessage.data (url və ya JSON body)
function tapUrl(r: Notifications.NotificationResponse | null): unknown {
  const req = r?.notification.request;
  if (!req) return null;
  if (req.content.data?.url) return req.content.data.url;
  const rm = (req.trigger as { remoteMessage?: { data?: Record<string, string> } } | null)?.remoteMessage?.data;
  if (rm?.url) return rm.url;
  try { return rm?.body ? (JSON.parse(rm.body) as { url?: string }).url : null; } catch { return null; }
}

// Bildirişə toxunanda uyğun tab açılır. Soyuq açılış (app bağlı idi): son toxunuş bir dəfə oxunur və silinir.
function useNotificationTaps() {
  useEffect(() => {
    const open = (r: Notifications.NotificationResponse | null) => {
      const url = tapUrl(r);
      if (typeof url === "string") openUrl(url);
    };
    const last = Notifications.getLastNotificationResponse();
    open(last);
    if (last) void Notifications.clearLastNotificationResponseAsync();
    const sub = Notifications.addNotificationResponseReceivedListener(open);
    return () => sub.remove();
  }, []);
}

export default useNotificationTaps;
