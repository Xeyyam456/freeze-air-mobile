import type { LucideIcon } from "lucide-react-native";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type CardProps = {
  title?: string;
  icon?: LucideIcon;
  right?: ReactNode;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
