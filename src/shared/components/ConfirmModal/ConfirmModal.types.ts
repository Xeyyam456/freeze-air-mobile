import type { ReactNode } from "react";
import type { Icon } from "@shared/icons";

export type ConfirmModalProps = {
  title: string;
  text?: ReactNode;
  icon: Icon;
  confirmTitle: string;
  danger?: boolean; // qırmızı (çıxış, silmə); yoxsa mavi qradiyent
  onConfirm: () => void;
  onClose: () => void;
};
