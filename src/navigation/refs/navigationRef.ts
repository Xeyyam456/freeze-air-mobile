import { createNavigationContainerRef } from "@react-navigation/native";
import { URL_TAB } from "@shared/config/push";
import type { RootStackParamList } from "@typings/navigation";

// React ağacından kənarda naviqasiya (bildirişə toxunanda). AppShell NavigationContainer-ə verir.
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

let pending: string | null = null; // app soyuq açılanda: naviqasiya hazır olana qədər gözləyən url

// Bildirişin url-inə uyğun tabı aç ("/tapshiriqlar" → Tapşırıqlar). Hazır deyilsə onReady-də açılır.
export function openUrl(url: string) {
  if (!navigationRef.isReady()) {
    pending = url;
    return;
  }
  const tab = URL_TAB[url.split("?")[0]] ?? "MoreTab";
  if (navigationRef.getRootState()?.routeNames.includes("Main")) navigationRef.navigate("Main", { screen: tab });
}

export function flushPendingUrl() {
  if (!pending) return;
  const url = pending;
  pending = null;
  openUrl(url);
}
