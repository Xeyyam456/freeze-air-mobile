import { ClipboardIcon, DashboardIcon, MegaphoneIcon, MenuIcon, WrenchIcon, type Icon } from "@shared/icons";
import type { MainTabParamList } from "@typings/navigation";

// Tab bar-ın ikon və yazıları (sıra MainTabNavigator-dakı Tab.Screen sırasıdır)
export const TABS: Record<keyof MainTabParamList, { icon: Icon; label: string }> = {
  PanelTab: { icon: DashboardIcon, label: "Panel" },
  TasksTab: { icon: ClipboardIcon, label: "Tapşırıqlar" },
  ToolsTab: { icon: WrenchIcon, label: "Alətlərim" },
  AnnouncementsTab: { icon: MegaphoneIcon, label: "Elanlar" },
  MoreTab: { icon: MenuIcon, label: "Daha çox" },
};
