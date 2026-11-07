import type { MoreRoute } from "@shared/config/more";
import type { MainTabParamList } from "@typings/navigation";

// Bildirişin url-i (web yolları, bazada notifications.url) → app-də hansı tab və lazım olsa "Daha çox" içində hansı ekran.
// Siyahıda olmayan → "Daha çox" menyusu
export type UrlTarget = { tab: keyof MainTabParamList; more?: MoreRoute };
export const URL_TAB: Record<string, UrlTarget> = {
  "/panel": { tab: "PanelTab" },
  "/tapshiriqlar": { tab: "TasksTab" },
  "/elanlar": { tab: "AnnouncementsTab" },
  "/aletlerim": { tab: "MoreTab", more: "Tools" },
  "/icazelerim": { tab: "MoreTab", more: "Leaves" },
  "/davamiyyet": { tab: "MoreTab", more: "Attendance" },
  "/yanacaq": { tab: "MoreTab", more: "Fuel" },
  // İş lenti: yeni iş/akt və şərh bildirişi (yalnız mobil; veb push getmir)
  "/qruplar": { tab: "GroupsTab" },
};

// Android bildiriş kanalları: Edge Function `push` növə görə bu id-lərlə göndərir (STYLE). Telefon ayarlarında hər birinin
// adı görünür və səsi ayrıca söndürülə bilər. "default" — növü olmayanlar və köhnə versiyanın ehtiyat kanalı
export const PUSH_CHANNELS = [
  { id: "announcements", name: "Elanlar", description: "Rəhbərliyin bütün komandaya elanları" },
  { id: "tasks", name: "Tapşırıqlar", description: "Sənə verilən yeni tapşırıqlar" },
  { id: "leave", name: "İcazələr", description: "İcazə sorğusunun cavabı" },
  { id: "depot", name: "Depo", description: "Verilən alət və materiallar" },
  { id: "feed", name: "Qruplar", description: "Yeni görülən iş, akt və şərhlər" },
  { id: "default", name: "Digər bildirişlər", description: "Qalan bildirişlər" },
] as const;
