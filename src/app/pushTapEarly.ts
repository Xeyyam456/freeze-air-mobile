import * as Notifications from "expo-notifications";
import { openUrl } from "@navigation/refs/navigationRef";

// Push toxunuşunu React ağacı qurulmazdan ƏVVƏL tut (index.ts-dən import olunur): tam bağlı tətbiqdə toxunuş hadisəsi çox erkən
// gələ bilər — komponentin useEffect dinləyicisi qoşulana qədər itirdi. openUrl naviqasiya hazır deyilsə url-i gözlədir (pending)
function tapUrl(r: Notifications.NotificationResponse | null | undefined): string | null {
  const req = r?.notification.request;
  if (!req) return null;
  const d = req.content.data as { url?: unknown } | null;
  if (typeof d?.url === "string") return d.url;
  const rm = (req.trigger as { remoteMessage?: { data?: Record<string, string> } } | null)?.remoteMessage?.data;
  if (rm?.url) return rm.url;
  try { const u = rm?.body ? (JSON.parse(rm.body) as { url?: unknown }).url : null; return typeof u === "string" ? u : null; } catch { return null; }
}

const seen = new Set<string>();
export function handleTap(r: Notifications.NotificationResponse | null | undefined, from: string) {
  if (!r) return;
  const id = `${r.notification.request.identifier}:${r.actionIdentifier}`;
  if (seen.has(id)) return;
  seen.add(id);
  const url = tapUrl(r);
  if (url) openUrl(url);
  void Notifications.clearLastNotificationResponseAsync();
}

Notifications.addNotificationResponseReceivedListener((r) => handleTap(r, "listener"));
handleTap(Notifications.getLastNotificationResponse(), "sync");
void Notifications.getLastNotificationResponseAsync().then((r) => handleTap(r, "async"));
