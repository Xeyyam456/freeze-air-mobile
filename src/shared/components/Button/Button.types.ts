import type { Icon } from "@shared/icons";
import type { StyleProp, ViewStyle } from "react-native";

// gradient: əsas hərəkət (mavi qradiyent) · glass: ikinci dərəcəli (şüşəvari) · danger: geri dönməz (çıxış, silmə) · qalanları düz rəng
export type ButtonVariant = "gradient" | "glass" | "primary" | "ok" | "navy" | "soft" | "danger";

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: Icon;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
