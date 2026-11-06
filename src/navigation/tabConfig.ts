import { ClipboardList, LayoutDashboard, Megaphone, Menu, Wrench, type LucideIcon } from "lucide-react-native";
import type { MainTabParamList } from "@typings/navigation";

// Tab bar-ın ikon və yazıları (sıra MainTabNavigator-dakı Tab.Screen sırasıdır)
export const TABS: Record<keyof MainTabParamList, { icon: LucideIcon; label: string }> = {
  PanelTab: { icon: LayoutDashboard, label: "Panel" },
  TasksTab: { icon: ClipboardList, label: "Tapşırıqlar" },
  ToolsTab: { icon: Wrench, label: "Alətlərim" },
  AnnouncementsTab: { icon: Megaphone, label: "Elanlar" },
  MoreTab: { icon: Menu, label: "Daha çox" },
};
