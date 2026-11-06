import type { MainTabParamList } from "@typings/navigation";

// Bildirişin url-i (web yolları, bazada notifications.url) → app-də hansı tab açılır. Siyahıda olmayan → "Daha çox".
export const URL_TAB: Record<string, keyof MainTabParamList> = {
  "/panel": "PanelTab",
  "/tapshiriqlar": "TasksTab",
  "/aletlerim": "ToolsTab",
  "/elanlar": "AnnouncementsTab",
};

// Android bildiriş kanalları: Edge Function `push` növə görə bu id-lərlə göndərir (STYLE). Telefon ayarlarında hər birinin
// adı görünür və səsi ayrıca söndürülə bilər. "default" — növü olmayanlar və köhnə versiyanın ehtiyat kanalı
export const PUSH_CHANNELS = [
  { id: "announcements", name: "Elanlar", description: "Rəhbərliyin bütün komandaya elanları" },
  { id: "tasks", name: "Tapşırıqlar", description: "Sənə verilən yeni tapşırıqlar" },
  { id: "leave", name: "İcazələr", description: "İcazə sorğusunun cavabı" },
  { id: "depot", name: "Depo", description: "Verilən alət və materiallar" },
  { id: "default", name: "Digər bildirişlər", description: "Qalan bildirişlər" },
] as const;
