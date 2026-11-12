import { Circle, Path, Rect } from "react-native-svg";
import { IconBase } from "./base";
import type { IconProps } from "./icon.types";

// Fayl və media ikonları (təmir qeydi: akt, şəkil, video, qalereya)

export const FileTextIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <Path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8M16 13H8M16 17H8" />
  </IconBase>
);

export const VideoIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <Rect x={2} y={6} width={14} height={12} rx={2} />
  </IconBase>
);

export const ImageIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect x={3} y={3} width={18} height={18} rx={2} />
    <Circle cx={9} cy={9} r={2} />
    <Path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </IconBase>
);

// Səs şərhi: mikrofon, oxut, dayandır
export const MicIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 19v3M19 10v2a7 7 0 0 1-14 0v-2" />
    <Rect x={9} y={2} width={6} height={13} rx={3} />
  </IconBase>
);

export const PlayIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
  </IconBase>
);

export const PauseIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect x={14} y={3} width={5} height={18} rx={1} />
    <Rect x={5} y={3} width={5} height={18} rx={1} />
  </IconBase>
);
