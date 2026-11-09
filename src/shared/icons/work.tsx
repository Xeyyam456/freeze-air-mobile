import { Circle, Path, Rect } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// İş və tapşırıq ikonları (yer, qrup, qeyd, şəkil)

export const CheckIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M20 6 9 17l-5-5" />
  </IconBase>
);

export const StoreIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
    <Path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
    <Path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
  </IconBase>
);

export const BuildingIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 10h.01M12 14h.01M12 6h.01M16 10h.01M16 14h.01M16 6h.01M8 10h.01M8 14h.01M8 6h.01M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    <Rect x={4} y={2} width={16} height={20} rx={2} />
  </IconBase>
);

export const MapPinIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <Circle cx={12} cy={10} r={3} />
  </IconBase>
);

export const UsersIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" />
    <Circle cx={9} cy={7} r={4} />
  </IconBase>
);

export const PenLineIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M13 21h8" />
    <Path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  </IconBase>
);

export const CameraIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
    <Circle cx={12} cy={13} r={3} />
  </IconBase>
);

export const ImagePlusIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M16 5h6M19 2v6M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    <Circle cx={9} cy={9} r={2} />
  </IconBase>
);

export const PackageIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
    <Path d="M12 22V12M3.3 7 12 12l8.7-5M7.5 4.27l9 5.15" />
  </IconBase>
);

export const UndoIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M9 14 4 9l5-5" />
    <Path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11" />
  </IconBase>
);

export const HandIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
    <Path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V8a2 2 0 0 0-4 0v3" />
  </IconBase>
);
