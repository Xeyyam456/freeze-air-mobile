import { Circle, Path, Rect } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// Giriş, hesab, davamiyyət ikonları

export const MailIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <Rect x={2} y={4} width={20} height={16} rx={2} />
  </IconBase>
);

export const LockIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconBase>
);

export const EyeIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <Circle cx={12} cy={12} r={3} />
  </IconBase>
);

export const EyeOffIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <Path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <Path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <Path d="m2 2 20 20" />
  </IconBase>
);

export const LogInIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m10 17 5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
  </IconBase>
);

export const LogOutIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m16 17 5-5-5-5M21 12H9M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  </IconBase>
);

// Loqo işarəsi (kondisioner → qar dənəsi)
export const SnowflakeIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m10 20-1.25-2.5L6 18M10 4 8.75 6.5 6 6m8 14 1.25-2.5L18 18M14 4l1.25 2.5L18 6m-1 15-3-6h-4m7-12-3 6 1.5 3M2 12h6.5L10 9m10 1-1.5 2 1.5 2m2-2h-6.5L14 15M4 10l1.5 2L4 14m3 7 3-6-1.5-3M7 3l3 6h4" />
  </IconBase>
);

export const WifiOffIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 20h.01M8.5 16.429a5 5 0 0 1 7 0M5 12.859a10 10 0 0 1 5.17-2.69M19 12.859a10 10 0 0 0-2.007-1.523M2 8.82a15 15 0 0 1 4.177-2.643M22 8.82a15 15 0 0 0-11.288-3.764M2 2l20 20" />
  </IconBase>
);
