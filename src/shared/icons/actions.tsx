import { Path } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// Hərəkət ikonları (göndər, sil)

export const SendIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zM21.854 2.147l-10.94 10.939" />
  </IconBase>
);

export const TrashIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M10 11v6M14 11v6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </IconBase>
);

// Şərh (lucide message-square-text) və reaksiya əlavə et (smile-plus)
export const MessageSquareTextIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM13 8H7M17 12H7" />
  </IconBase>
);

export const SmilePlusIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M22 11v1a10 10 0 1 1-9-10M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M16 5h6M19 2v6" />
  </IconBase>
);

// Gülüş (lucide smile): şərh yazarkən smaylik paketini açır
export const SmileIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </IconBase>
);
