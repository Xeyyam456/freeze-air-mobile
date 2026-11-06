import type { MonthOverview, MyDayStats } from "@typings/panel";

export type PanelDashboardProps = {
  name: string;
  email: string;
  photo: string | null;
  employeeId: number | undefined;
  day: string;
  stats: MyDayStats | undefined;
  overview: MonthOverview | undefined;
  logsCount: number | undefined;
};
