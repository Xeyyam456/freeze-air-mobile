import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { openUrl } from "@navigation/refs/navigationRef";

// Bildirişə toxunanda uyğun tab açılır. Soyuq açılış (app bağlı idi): son toxunuş bir dəfə oxunur və silinir.
function useNotificationTaps() {
  useEffect(() => {
    const open = (r: Notifications.NotificationResponse | null) => {
      const url = r?.notification.request.content.data?.url;
      if (typeof url === "string") openUrl(url);
    };
    void Notifications.getLastNotificationResponseAsync().then((r) => {
      open(r);
      if (r) void Notifications.clearLastNotificationResponseAsync();
    });
    const sub = Notifications.addNotificationResponseReceivedListener(open);
    return () => sub.remove();
  }, []);
}

export default useNotificationTaps;
