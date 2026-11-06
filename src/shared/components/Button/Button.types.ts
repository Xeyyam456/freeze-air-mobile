import type { LucideIcon } from "lucide-react-native";
import type { StyleProp, ViewStyle } from "react-native";

export type ButtonVariant = "primary" | "ok" | "navy" | "soft";

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
