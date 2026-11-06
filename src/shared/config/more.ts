import { AlertTriangleIcon, BuildingIcon, CalendarCheckIcon, CalendarOffIcon, FuelIcon, StoreIcon, UserCogIcon, UsersIcon, WrenchIcon, type Icon } from "@shared/icons";
import type { MoreStackParamList } from "@typings/navigation";

export type MoreRoute = Exclude<keyof MoreStackParamList, "MoreMain" | "AttendanceCalendar">;
export type MoreLink = { route: MoreRoute; label: string; hint: string; icon: Icon; color: string };

// "Daha çox" menyusu (web usta panelinin yan menyusu kimi qruplar). Hazır olmayan bölmə "Tezliklə" ekranı açır
// (MorePlaceholderScreen): ekran yazılanda MoreStackNavigator-da onu öz komponenti ilə əvəz et
export const MORE_GROUPS: { title: string; links: MoreLink[] }[] = [
  {
    title: "Gündəlik",
    links: [
      { route: "Attendance", label: "Davamiyyət", hint: "Gəlmə-getmə, təqvim", icon: CalendarCheckIcon, color: "#34d399" },
      { route: "Leaves", label: "İcazələrim", hint: "İcazə istə, sorğuların", icon: CalendarOffIcon, color: "#a78bfa" },
      { route: "Tools", label: "Alətlərim", hint: "Məndəki alət və materiallar", icon: WrenchIcon, color: "#4f8dff" },
      { route: "Fuel", label: "Yanacaq", hint: "Km və yanacaq pulu", icon: FuelIcon, color: "#fbbf24" },
    ],
  },
  {
    title: "Məlumat",
    links: [
      { route: "Companies", label: "Şirkətlər", hint: "Müqavilə bağlanan şirkətlər", icon: BuildingIcon, color: "#4f8dff" },
      { route: "Stores", label: "Mağazalar", hint: "Filiallar, ünvan, xəritə", icon: StoreIcon, color: "#22c3e6" },
      { route: "ErrorCodes", label: "Xəta kodları", hint: "Kondisioner xəta kodları", icon: AlertTriangleIcon, color: "#f87171" },
    ],
  },
  {
    title: "Komanda",
    links: [
      { route: "Employees", label: "Ustalar", hint: "Komanda, əlaqə", icon: UsersIcon, color: "#4f8dff" },
      { route: "Management", label: "Rəhbərlik", hint: "Rəhbərlər, əlaqə", icon: UserCogIcon, color: "#a78bfa" },
    ],
  },
];

export const MORE_LINK = Object.fromEntries(MORE_GROUPS.flatMap((g) => g.links).map((l) => [l.route, l])) as Record<MoreRoute, MoreLink>;
