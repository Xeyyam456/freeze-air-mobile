import { Circle, Path, Rect } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// Komanda bölmələrinin ikonları (telefon, təcrübə, axtarış, maşın, müdir)

export const PhoneIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
  </IconBase>
);

export const BriefcaseIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <Rect x={2} y={6} width={20} height={14} rx={2} />
  </IconBase>
);

export const SearchIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={11} cy={11} r={8} />
    <Path d="m21 21-4.3-4.3" />
  </IconBase>
);

export const CarIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2M9 17h6" />
    <Circle cx={7} cy={17} r={2} />
    <Circle cx={17} cy={17} r={2} />
  </IconBase>
);

export const CrownIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
    <Path d="M5 21h14" />
  </IconBase>
);

export const PaperclipIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.57 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </IconBase>
);
