import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NoteTask } from "@typings/taskNote";

// Giriş yoxdursa yalnız Login, varsa Main (auth flow: RootNavigator sessiyaya görə ekranları dəyişir)
export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  TaskNote: { task: NoteTask }; // təmir qeydi: tab bar-ın üstündə tam ekran
  LeaveRequest: undefined; // icazə istə: tab bar-ın üstündə tam ekran
};

// Aşağıdakı tab bar (navigation/TabBar)
export type MainTabParamList = {
  PanelTab: NavigatorScreenParams<PanelStackParamList> | undefined;
  TasksTab: undefined;
  GroupsTab: NavigatorScreenParams<GroupsStackParamList> | undefined;
  AnnouncementsTab: undefined;
  MoreTab: NavigatorScreenParams<MoreStackParamList> | undefined;
};

export type PanelStackParamList = {
  PanelMain: undefined;
  Attendance: undefined; // davamiyyət: bütün ustalar, ay üzrə
  AttendanceCalendar: { employeeId: number; name: string }; // ustanın təqvimi və saatları
  Profile: undefined; // sağ üstdəki şəkil: profil şəkli, çıxış
};

// "Daha çox" tabının stack-i (menyu: shared/config/more.ts). Davamiyyət ekranları Panel stack-i ilə ortaqdır (eyni adlar)
export type MoreStackParamList = {
  MoreMain: undefined;
  Attendance: undefined;
  AttendanceCalendar: { employeeId: number; name: string };
  Leaves: undefined;
  Tools: undefined;
  Fuel: undefined;
  Companies: undefined;
  CompanyDetail: { id: number; name: string; kind?: "company" | "market" };
  Stores: undefined;
  ErrorCodes: undefined;
  Employees: undefined;
  Management: undefined;
};

// "Qruplar" tabının stack-i: qrup siyahısı → qrupun lenti (Görülən işlər / Aktlar)
export type GroupsStackParamList = {
  GroupsMain: undefined;
  WorkFeed: undefined;
  ActFeed: undefined;
};
