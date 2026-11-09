import { useId, useState } from "react";
import { type LayoutChangeEvent, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import type { GlassSheenProps } from "./GlassSheen.types";

// Şüşə kartın "parıltısı" (premium dərinlik): yuxarıdan aşağı solan zəif ağ işıq + üst kənarda ortası parlaq, kənarları sönən nazik xətt.
// Kartın İLK uşağı kimi qoy (absolute, toxunuşa mane olmur). Ölçü onLayout ilə rəqəm (Android-də Svg "100%" problemi)
function GlassSheen({ radius = 24, strength = 1 }: GlassSheenProps) {
  const id = useId().replace(/:/g, "");
  const [s, setS] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    setS((p) => (p.w === w && p.h === h ? p : { w, h }));
  };
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout}>
      {s.w > 0 && (
        <Svg width={s.w} height={s.h}>
          <Defs>
            <LinearGradient id={`v${id}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#ffffff" stopOpacity={0.06 * strength} />
              <Stop offset="0.5" stopColor="#ffffff" stopOpacity={0} />
            </LinearGradient>
            <LinearGradient id={`h${id}`} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#ffffff" stopOpacity={0} />
              <Stop offset="0.5" stopColor="#ffffff" stopOpacity={0.22 * strength} />
              <Stop offset="1" stopColor="#ffffff" stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Rect width={s.w} height={s.h} rx={radius} fill={`url(#v${id})`} />
          <Rect x={radius} y={0} width={Math.max(0, s.w - radius * 2)} height={1} fill={`url(#h${id})`} />
        </Svg>
      )}
    </View>
  );
}

export default GlassSheen;
