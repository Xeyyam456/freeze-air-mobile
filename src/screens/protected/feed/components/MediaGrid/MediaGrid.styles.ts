import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

// Kollaj bir blok kimi: xarici künclər yuvarlaq (overflow), xanalar arasında 4 px aralıq
export const styles = StyleSheet.create({
  box: { borderRadius: 14, overflow: "hidden" },
  row: { flexDirection: "row", gap: 4 },
  col: { gap: 4 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  cell: { overflow: "hidden", backgroundColor: c.surface2 },
  image: { width: "100%", height: "100%" },
  more: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.55)" },
  moreText: { color: c.white, fontSize: 22, fontWeight: "800" },
  badge: { position: "absolute", left: 6, bottom: 6, color: c.white, backgroundColor: "rgba(0, 0, 0, 0.6)", fontSize: 10, fontWeight: "800", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, overflow: "hidden" },
});
