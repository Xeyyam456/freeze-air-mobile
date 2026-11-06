import Svg from "react-native-svg";
import { c } from "@theme/colors";
import type { IconBaseProps } from "./icon.types";

// Ümumi çərçivə: stroke rəngi/qalınlığı Svg-dən bütün path-lara keçir (hər path-da təkrar yazılmır).
// Path məlumatı lucide-dandır (ISC lisenziya); kitabxana özü yoxdur — Metro tree-shaking etmir, barrel import ~1600 ikonu bundle-a salırdı.
export function IconBase({ size = 24, color = c.muted, strokeWidth = 2, children }: IconBaseProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </Svg>
  );
}
