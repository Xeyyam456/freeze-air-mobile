import { createNavigationContainerRef } from "@react-navigation/native";
import { URL_TAB } from "@shared/config/push";
import type { RootStackParamList } from "@typings/navigation";

// React ağacından kənarda naviqasiya (bildirişə toxunanda). AppShell NavigationContainer-ə verir.
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

let pending: string | null = null; // app soyuq açılanda: naviqasiya hazır olana qədər gözləyən url

// Bildirişin url-inə uyğun tabı (və "Daha çox" içində ekranı) aç: "/tapshiriqlar" → Tapşırıqlar, "/aletlerim" → Daha çox → Alətlərim.
// Hazır deyilsə onReady-də açılır.
export function openUrl(url: string) {
  if (!navigationRef.isReady()) {
    pending = url;
    return;
  }
  // Tam ünvan gələrsə (https://.../tapshiriqlar) yalnız yolu götür
  const path = url.replace(/^https?:\/\/[^/]+/, "").split("?")[0] || "/";
  const target = URL_TAB[path] ?? { tab: "MoreTab" };
  // Soyuq açılış: sessiya hələ bərpa olunmayıb (Login/boş) → url gözləyir, Main görünəndə açılır (onStateChange → flushPendingUrl)
  if (!navigationRef.getRootState()?.routeNames.includes("Main")) { pending = url; return; }
  if (target.tab === "MoreTab") {
    navigationRef.navigate("Main", { screen: "MoreTab", params: { screen: target.more ?? "MoreMain" } });
  } else {
    navigationRef.navigate("Main", { screen: target.tab });
  }
}

export function flushPendingUrl() {
  if (!pending) return;
  const url = pending;
  pending = null;
  openUrl(url);
}
