import type { ReactNode } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import type { IconProps } from "./icon.types";

// Dolu (solid) ikonlar — tab bar-da AKTİV tab üçün (passivdə xətli variant qalır, iOS/Instagram qaydası).
// Forma rənglə doldurulur; içindəki detallar (xətt, nöqtə) "kəsik" rəngindədir = aktiv həbin altındakı fon,
// ona görə ikon həbin içində oyulmuş kimi görünür. Kəsik rəngi: c.surface + c.primarySoft qarışığı.
const CUT = "#182643";

function SolidBase({ size = 24, color, children }: IconProps & { children: ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </Svg>
  );
}

export const DashboardSolidIcon = (p: IconProps) => (
  <SolidBase {...p}>
    <Rect width={7} height={9} x={3} y={3} rx={1.5} />
    <Rect width={7} height={5} x={14} y={3} rx={1.5} />
    <Rect width={7} height={9} x={14} y={12} rx={1.5} />
    <Rect width={7} height={5} x={3} y={16} rx={1.5} />
  </SolidBase>
);

export const ClipboardSolidIcon = (p: IconProps) => (
  <SolidBase {...p}>
    <Rect width={16} height={18} x={4} y={4} rx={2.5} />
    <Rect width={8} height={4} x={8} y={2} rx={1} stroke={CUT} strokeWidth={1.6} />
    <Path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" fill="none" stroke={CUT} strokeWidth={2.2} />
  </SolidBase>
);

export const ChatSolidIcon = (p: IconProps) => (
  <SolidBase {...p}>
    <Path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <Circle cx={8.2} cy={12} r={1.25} fill={CUT} stroke="none" />
    <Circle cx={12.2} cy={12} r={1.25} fill={CUT} stroke="none" />
    <Circle cx={16.2} cy={12} r={1.25} fill={CUT} stroke="none" />
  </SolidBase>
);

export const MegaphoneSolidIcon = (p: IconProps) => (
  <SolidBase {...p}>
    <Path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <Path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
    <Path d="M8 6.8v6.4" fill="none" stroke={CUT} strokeWidth={1.8} />
  </SolidBase>
);

// "Daha çox": dolu variantda xətlər qalınlaşır, ortadakı qısalır (yığcam, vurğulu görünüş)
export const MenuSolidIcon = ({ size = 24, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round">
    <Path d="M4 5.5h16M4 12h11M4 18.5h16" />
  </Svg>
);
