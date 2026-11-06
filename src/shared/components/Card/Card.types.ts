import type { Icon } from "@shared/icons";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type CardProps = {
  title?: string;
  icon?: Icon;
  right?: ReactNode;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
