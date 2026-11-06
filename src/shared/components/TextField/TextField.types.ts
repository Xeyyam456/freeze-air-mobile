import type { Icon } from "@shared/icons";
import type { TextInputProps } from "react-native";

export type TextFieldProps = Omit<TextInputProps, "style"> & {
  label: string;
  icon?: Icon;
  secure?: boolean; // parol: göz düyməsi ilə göstər/gizlət
};
