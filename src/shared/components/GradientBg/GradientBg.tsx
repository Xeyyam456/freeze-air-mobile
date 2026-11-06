import { useId, useState } from "react";
import { type LayoutChangeEvent, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from "react-native-svg";
import type { GradientBgProps } from "./GradientBg.types";

// Kartın arxasında qradiyent fon (react-native-svg: yeni native paket lazım deyil).
// colors: yuxarı-sol → aşağı-sağ; glow: sağ yuxarı küncdə yumşaq işıq ləkəsi.
// Ölçü onLayout ilə rəqəm kimi verilir: Android-də Svg "100%" yalnız ilk ölçünü götürür,
// kart sonradan böyüyəndə (seans siyahısı) fon yarıda qalırdı.
function GradientBg({ colors, glow, radius = 20 }: GradientBgProps) {
  const id = useId().replace(/:/g, "");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
  };
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout}>
      {size.w > 0 && (
        <Svg width={size.w} height={size.h}>
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
          <Rect width={size.w} height={size.h} rx={radius} fill={`url(#lg${id})`} />
          {glow && <Rect width={size.w} height={size.h} rx={radius} fill={`url(#rg${id})`} />}
        </Svg>
      )}
    </View>
  );
}

export default GradientBg;
