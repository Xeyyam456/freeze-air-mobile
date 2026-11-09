import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { handleTap } from "@app/pushTapEarly";

// Bildirişə toxunanda uyğun tab açılır. Əsas tutma `app/pushTapEarly.ts`-dədir (index.ts-dən, React-dan əvvəl);
// bu hook ehtiyatdır: `useLastNotificationResponse` dəyər sonradan gələndə də tutur. Eyni toxunuş bir dəfə emal olunur (handleTap)
function useNotificationTaps() {
  const last = Notifications.useLastNotificationResponse();
  useEffect(() => { if (last) handleTap(last, "hook"); }, [last]);
}

export default useNotificationTaps;
