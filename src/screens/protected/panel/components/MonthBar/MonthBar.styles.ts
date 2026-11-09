import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  // Sütun yeri: aşağıdan yuxarı böyüyür
  slot: { flex: 1, alignItems: "center", justifyContent: "flex-end", height: "100%" },
  bar: { width: "62%", maxWidth: 9, borderRadius: 4 },
  past: { backgroundColor: c.primary, opacity: 0.55 },
  today: { backgroundColor: c.primary },
  // Bu günün sütununun arxasında yumşaq işıq
  glow: { position: "absolute", bottom: -4, width: "100%", maxWidth: 16, borderRadius: 8, backgroundColor: "rgba(79, 141, 255, 0.18)" },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: c.faint, opacity: 0.8 },
  future: { opacity: 0.3 },
});
