import { memo } from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Path, Rect, Text as SvgText } from "react-native-svg";
import { styles } from "./FileArt.styles";
import type { FileArtProps } from "./FileArt.types";

// Lentdə şəkli olmayan faylın plitəsi (real görünüşlü, sabit — lentdə çox olduğu üçün animasiyasız):
// video = tünd film kadrı (kənarlarında lent dəlikləri) + qırmızı oynat düyməsi; pdf = ağ akt kağızı + qırmızı "PDF" etiketi. memo
function FileArt({ kind }: FileArtProps) {
  return (
    <View style={styles.tile}>
      {kind === "video" ? (
        <Svg width={46} height={36} viewBox="0 0 46 36">
          <Rect x={0.5} y={0.5} width={45} height={35} rx={6} fill="#0f172a" stroke="#334155" strokeWidth={1} />
          {[4, 12, 20, 28].map((y) => <Rect key={`l${y}`} x={3} y={y} width={4} height={3} rx={0.8} fill="#475569" />)}
          {[4, 12, 20, 28].map((y) => <Rect key={`r${y}`} x={39} y={y} width={4} height={3} rx={0.8} fill="#475569" />)}
          <Circle cx={23} cy={18} r={9.5} fill="#ef4444" />
          <Path d="M20.5 13.8 L28 18 L20.5 22.2 Z" fill="#ffffff" />
        </Svg>
      ) : (
        <Svg width={34} height={42} viewBox="0 0 34 42">
          <Path d="M4 1 H24 L33 10 V38 A3 3 0 0 1 30 41 H4 A3 3 0 0 1 1 38 V4 A3 3 0 0 1 4 1 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />
          <Path d="M24 1 V7 A3 3 0 0 0 27 10 H33 Z" fill="#cbd5e1" />
          <Rect x={6} y={13} width={20} height={1.8} rx={0.9} fill="#94a3b8" />
          <Rect x={6} y={18} width={16} height={1.8} rx={0.9} fill="#94a3b8" />
          <Rect x={3} y={26} width={22} height={10} rx={2.5} fill="#ef4444" />
          <SvgText x={14} y={33.6} fontSize={7.5} fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing={0.4}>PDF</SvgText>
        </Svg>
      )}
      <Text style={styles.label}>{kind === "video" ? "Video" : "Akt"}</Text>
    </View>
  );
}

export default memo(FileArt);
