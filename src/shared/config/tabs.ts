import { ChatIcon, ClipboardIcon, DashboardIcon, MegaphoneIcon, MenuIcon, type Icon } from "@shared/icons";
import type { MainTabParamList } from "@typings/navigation";

// Tab bar-ın ikon, yazı və RƏNGLƏRİ (sıra MainTabNavigator-dakı Tab.Screen sırasıdır).
// Hər tabın öz rəngi var (istifadəçi: "normal rənglənmiş ikonlar"): passivdə solğun, aktivdə tam + həb və üst xətt həmin rəngdə
export const TABS: Record<keyof MainTabParamList, { icon: Icon; label: string; color: string; soft: string }> = {
  PanelTab: { icon: DashboardIcon, label: "Panel", color: "#4f8dff", soft: "rgba(79, 141, 255, 0.16)" },
  TasksTab: { icon: ClipboardIcon, label: "Tapşırıqlar", color: "#fbbf24", soft: "rgba(251, 191, 36, 0.16)" },
  GroupsTab: { icon: ChatIcon, label: "Qruplar", color: "#34d399", soft: "rgba(52, 211, 153, 0.16)" },
  AnnouncementsTab: { icon: MegaphoneIcon, label: "Elanlar", color: "#f472b6", soft: "rgba(244, 114, 182, 0.16)" },
  MoreTab: { icon: MenuIcon, label: "Daha çox", color: "#a78bfa", soft: "rgba(167, 139, 250, 0.16)" },
};
