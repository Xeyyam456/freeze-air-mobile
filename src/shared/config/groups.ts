import { CameraIcon, FileTextIcon, type Icon } from "@shared/icons";
import type { FeedGroup } from "@typings/feed";
import type { GroupsStackParamList } from "@typings/navigation";

export type GroupLink = { route: "WorkFeed" | "ActFeed"; group: FeedGroup; label: string; hint: string; icon: Icon; color: string };

// "Qruplar" tabının siyahısı (WhatsApp qrupları kimi): tapşırıq qeydinə yüklənən fayllar burada toplanır
export const GROUPS: GroupLink[] = [
  { route: "WorkFeed", group: "work", label: "Görülən işlər", hint: "Ustaların şəkil və videoları", icon: CameraIcon, color: "#22c3e6" },
  { route: "ActFeed", group: "act", label: "Aktlar", hint: "Yüklənən aktlar", icon: FileTextIcon, color: "#fbbf24" },
];

export type GroupRoute = Exclude<keyof GroupsStackParamList, "GroupsMain">;
