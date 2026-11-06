import { DarkTheme, type Theme } from "@react-navigation/native";
import { c } from "@theme/colors";

// React Navigation-ın tünd teması bizim tokenlərlə (ekran keçidində ağ yanıb-sönmə olmasın)
export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: c.primary,
    background: c.bg,
    card: c.surface,
    text: c.ink,
    border: c.line,
    notification: c.orange,
  },
};
