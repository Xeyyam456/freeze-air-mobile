import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NoteTask } from "@typings/taskNote";

// Giriş yoxdursa yalnız Login, varsa Main (auth flow: RootNavigator sessiyaya görə ekranları dəyişir)
export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  TaskNote: { task: NoteTask }; // təmir qeydi: tab bar-ın üstündə tam ekran
};

// Aşağıdakı tab bar (navigation/TabBar)
export type MainTabParamList = {
  PanelTab: NavigatorScreenParams<PanelStackParamList> | undefined;
  TasksTab: undefined;
  ToolsTab: undefined;
  AnnouncementsTab: undefined;
  MoreTab: undefined;
};

export type PanelStackParamList = {
  PanelMain: undefined;
  Attendance: undefined; // davamiyyət: bütün ustalar, ay üzrə
  AttendanceCalendar: { employeeId: number; name: string }; // ustanın təqvimi və saatları
  Profile: undefined; // sağ üstdəki şəkil: profil şəkli, çıxış
};
