import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

// Hər xana ayrı kart: öz yuvarlaq künclər və nazik çərçivə, aralarında 8 px (GAP ilə eyni)
export const styles = StyleSheet.create({
  box: {},
  row: { flexDirection: "row", gap: 8 },
  col: { gap: 8 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { overflow: "hidden", borderRadius: 12, borderWidth: 1, borderColor: c.glassBorder, backgroundColor: c.surface2 },
  image: { width: "100%", height: "100%" },
  more: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.55)" },
  moreText: { color: c.white, fontSize: 22, fontWeight: "800" },
  badge: { position: "absolute", left: 6, bottom: 6, color: c.white, backgroundColor: "rgba(0, 0, 0, 0.6)", fontSize: 10, fontWeight: "800", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, overflow: "hidden" },
});
