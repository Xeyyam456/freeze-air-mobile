import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderWidth: 1, borderColor: "rgba(34, 195, 230, 0.18)", overflow: "hidden", padding: space.lg, gap: 16 },
  top: { flexDirection: "row", alignItems: "center", gap: 14 },
  text: { flex: 1, gap: 3 },
  name: { color: c.white, fontSize: 21, fontWeight: "800", lineHeight: 26 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { flexDirection: "row", alignItems: "center", gap: 8, width: "100%", paddingHorizontal: 12, paddingVertical: 9, borderRadius: 12, backgroundColor: "rgba(255, 255, 255, 0.07)" },
  pair: { flexDirection: "row", gap: 8, width: "100%" },
  grow: { flex: 1, width: undefined, minWidth: 0 },
  fit: { width: undefined, flexShrink: 0 },
  chipFull: { width: "100%" },
  chipText: { color: "rgba(255, 255, 255, 0.85)", fontSize: 13, flexShrink: 1 },
  chipLink: { color: "#22c3e6", fontWeight: "700" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, height: 50, borderRadius: 15, backgroundColor: c.primary },
  navOff: { opacity: 0.4 },
  row2: { flexDirection: "row", gap: 8 },
  sec: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, height: 44, borderRadius: 14, backgroundColor: "rgba(255, 255, 255, 0.1)" },
  secText: { color: c.white, fontSize: 13, fontWeight: "800" },
  navText: { color: c.white, fontSize: 15, fontWeight: "800" },
});
