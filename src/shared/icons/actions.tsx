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
