import type { NavigatorScreenParams } from "@react-navigation/native";

// Giriş yoxdursa yalnız Login, varsa Main (auth flow: RootNavigator sessiyaya görə ekranları dəyişir)
export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
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
};
