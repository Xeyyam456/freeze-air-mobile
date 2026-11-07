import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderWidth: 1, borderColor: c.glassBorder, padding: space.lg, gap: space.md, overflow: "hidden" },
  top: { flexDirection: "row", alignItems: "center", gap: space.md },
  tile: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  kicker: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  big: { color: c.ink, fontSize: 26, fontWeight: "800", fontVariant: ["tabular-nums"] },
  bigSub: { color: c.muted, fontSize: 15, fontWeight: "600" },
  bar: { flexDirection: "row", height: 6, borderRadius: 3, overflow: "hidden", gap: 2, backgroundColor: "rgba(255, 255, 255, 0.06)" },
  seg: { height: 6 },
  row: { flexDirection: "row", gap: 6 },
  cell: { flex: 1, alignItems: "center", gap: 2, paddingVertical: 9, borderRadius: 12, borderWidth: 1, borderColor: "transparent", backgroundColor: "rgba(255, 255, 255, 0.04)" },
  on: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.5)" },
  num: { fontSize: 18, fontWeight: "800", fontVariant: ["tabular-nums"] },
  label: { color: c.muted, fontSize: 11, fontWeight: "700" },
  labelOn: { color: c.ink },
});
