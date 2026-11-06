import type { LucideIcon } from "lucide-react-native";
import type { TextInputProps } from "react-native";

export type TextFieldProps = Omit<TextInputProps, "style"> & {
  label: string;
  icon?: LucideIcon;
  secure?: boolean; // parol: göz düyməsi ilə göstər/gizlət
};
