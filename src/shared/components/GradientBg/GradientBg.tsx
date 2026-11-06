import { useId } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from "react-native-svg";
import type { GradientBgProps } from "./GradientBg.types";

// Kartın arxasında qradiyent fon (react-native-svg: yeni native paket lazım deyil).
// colors: yuxarı-sol → aşağı-sağ; glow: sağ yuxarı küncdə yumşaq işıq ləkəsi.
// Svg View-un içində 100%: kart hündürlüyü sonradan böyüyəndə (flexGrow, minHeight) fon da tam dolur.
function GradientBg({ colors, glow, radius = 20 }: GradientBgProps) {
  const id = useId().replace(/:/g, "");
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id={`lg${id}`} x1="0" y1="0" x2="1" y2="1">
            {colors.map((col, i) => <Stop key={col + i} offset={i / Math.max(1, colors.length - 1)} stopColor={col} />)}
          </LinearGradient>
          {glow && (
            <RadialGradient id={`rg${id}`} cx="88%" cy="0%" r="70%">
              <Stop offset="0" stopColor={glow} stopOpacity={0.55} />
              <Stop offset="1" stopColor={glow} stopOpacity={0} />
            </RadialGradient>
          )}
        </Defs>
        <Rect width="100%" height="100%" rx={radius} fill={`url(#lg${id})`} />
        {glow && <Rect width="100%" height="100%" rx={radius} fill={`url(#rg${id})`} />}
      </Svg>
    </View>
  );
}

export default GradientBg;
