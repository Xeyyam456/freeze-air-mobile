import { Path, Rect } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// Tab bar və keçid ikonları

export const DashboardIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect width={7} height={9} x={3} y={3} rx={1} />
    <Rect width={7} height={5} x={14} y={3} rx={1} />
    <Rect width={7} height={9} x={14} y={12} rx={1} />
    <Rect width={7} height={5} x={3} y={16} rx={1} />
  </IconBase>
);

export const ClipboardIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
    <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <Path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </IconBase>
);

export const WrenchIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
  </IconBase>
);

export const MegaphoneIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <Path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
    <Path d="M8 6v8" />
  </IconBase>
);

export const MenuIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M4 5h16M4 12h16M4 19h16" />
  </IconBase>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m15 18-6-6 6-6" />
  </IconBase>
);

export const ChevronRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m9 18 6-6-6-6" />
  </IconBase>
);

export const ArrowRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M5 12h14M12 5l7 7-7 7" />
  </IconBase>
);

export const CloseIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M18 6 6 18M6 6l12 12" />
  </IconBase>
);

export const CalendarCheckIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M8 2v4M16 2v4M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M3 10h18M16 20l2 2 4-4" />
  </IconBase>
);

export const ClockIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 6v6l4 2" />
    <Path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0" />
  </IconBase>
);

export const ChevronDownIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m6 9 6 6 6-6" />
  </IconBase>
);
