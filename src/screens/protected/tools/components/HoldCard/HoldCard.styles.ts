import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md, gap: space.md },
  top: { flexDirection: "row", alignItems: "center", gap: space.md },
  tile: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.05)" },
  text: { flex: 1, gap: 2 },
  name: { color: c.ink, fontSize: 15, fontWeight: "700" },
  meta: { color: c.muted, fontSize: 12 },
  qty: { color: c.ink, fontSize: 15, fontWeight: "800", fontVariant: ["tabular-nums"], maxWidth: 110, textAlign: "right" },
  foot: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  state: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  stateText: { fontSize: 12, fontWeight: "700" },
  btn: { height: 34, paddingHorizontal: 12, borderRadius: 11, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  btnText: { color: c.primary, fontSize: 13, fontWeight: "700" },
});
