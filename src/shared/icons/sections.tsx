import { Circle, Path } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// "Daha çox" menyusunun bölmə ikonları (yanacaq, xəta kodları, icazələr, rəhbərlik)

export const FuelIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18M2 22h14M4 9h10" />
  </IconBase>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01" />
  </IconBase>
);

export const CalendarOffIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18M21 15.5V6a2 2 0 0 0-2-2H9.5M16 2v4M3 10h7M21 10h-5.5M2 2l20 20" />
  </IconBase>
);

export const UserCogIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M2 21a8 8 0 0 1 10.434-7.62M18.5 14.4l-.4.9M18.5 20.6l-.4-.9M20.6 18.5l-.9-.4M20.6 15.5l-.9.4M15.5 15.5l.9.4M15.5 18.5l.9-.4M15.6 20.6l.4-.9M15.6 14.4l.4.9" />
    <Circle cx={10} cy={8} r={5} />
    <Circle cx={18} cy={17} r={3} />
  </IconBase>
);
