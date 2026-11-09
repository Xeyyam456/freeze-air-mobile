import { ChatIcon, ChatSolidIcon, ClipboardIcon, ClipboardSolidIcon, DashboardIcon, DashboardSolidIcon, MegaphoneIcon, MegaphoneSolidIcon, MenuIcon, MenuSolidIcon, type Icon } from "@shared/icons";
import type { MainTabParamList } from "@typings/navigation";

// Tab bar-ın ikon və yazıları (sıra MainTabNavigator-dakı Tab.Screen sırasıdır).
// icon: passiv (xətli), active: aktiv tab üçün dolu variant (shared/icons/solid.tsx)
export const TABS: Record<keyof MainTabParamList, { icon: Icon; active: Icon; label: string }> = {
  PanelTab: { icon: DashboardIcon, active: DashboardSolidIcon, label: "Panel" },
  TasksTab: { icon: ClipboardIcon, active: ClipboardSolidIcon, label: "Tapşırıqlar" },
  GroupsTab: { icon: ChatIcon, active: ChatSolidIcon, label: "Qruplar" },
  AnnouncementsTab: { icon: MegaphoneIcon, active: MegaphoneSolidIcon, label: "Elanlar" },
  MoreTab: { icon: MenuIcon, active: MenuSolidIcon, label: "Daha çox" },
};
