import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type DragSheetProps = {
  style: StyleProp<ViewStyle>;
  onClose: () => void;
  children: ReactNode;
};
