import type { LucideIcon } from "lucide-react-native";
import type { StyleProp, ViewStyle } from "react-native";

// gradient: əsas hərəkət (mavi qradiyent) · glass: ikinci dərəcəli (şüşəvari) · qalanları düz rəng
export type ButtonVariant = "gradient" | "glass" | "primary" | "ok" | "navy" | "soft";

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
