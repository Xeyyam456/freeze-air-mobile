import type { MainTabParamList } from "@typings/navigation";

// Bildirişin url-i (web yolları, bazada notifications.url) → app-də hansı tab açılır. Siyahıda olmayan → "Daha çox".
export const URL_TAB: Record<string, keyof MainTabParamList> = {
  "/panel": "PanelTab",
  "/tapshiriqlar": "TasksTab",
  "/aletlerim": "ToolsTab",
  "/elanlar": "AnnouncementsTab",
};

// Android bildiriş kanalı (Edge Function `push` bu id ilə göndərir)
export const PUSH_CHANNEL = { id: "default", name: "Bildirişlər" } as const;
