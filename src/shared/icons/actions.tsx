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

// Web ilə eyni dil: ok-yuxarı-sağ (karta keçid), istifadəçi (əlaqə şəxsi), naviqator
export const ArrowUpRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M7 7h10v10M7 17 17 7" />
  </IconBase>
);

export const UserIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
  </IconBase>
);

export const NavigationIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m3 11 19-9-9 19-2-8z" />
  </IconBase>
);

// Xəritə və dəqiq yer (GPS)
export const MapIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M14.1 5.55a2 2 0 0 0 1.8 0l3.66-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.55 2.28a2 2 0 0 1-1.79 0l-4.21-2.1a2 2 0 0 0-1.79 0l-3.66 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9l4.55-2.28a2 2 0 0 1 1.79 0zM15 5.76v15M9 3.24v15" />
  </IconBase>
);

export const LocateFixedIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M2 12h3M19 12h3M12 2v3M12 19v3M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
  </IconBase>
);
