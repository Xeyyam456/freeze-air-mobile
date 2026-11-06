import type { NavigatorScreenParams } from "@react-navigation/native";

// Giriş yoxdursa yalnız Login, varsa Main (auth flow: RootNavigator sessiyaya görə ekranları dəyişir)
export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<PanelStackParamList> | undefined;
};

// Usta paneli. Yeni bölmələr (Tapşırıqlar, Alətlərim...) gələndə burada tab naviqatoru olacaq.
export type PanelStackParamList = {
  PanelMain: undefined;
};
