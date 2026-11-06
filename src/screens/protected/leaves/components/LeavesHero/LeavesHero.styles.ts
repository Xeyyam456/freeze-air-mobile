import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderWidth: 1, borderColor: c.glassBorder, padding: space.lg, gap: space.lg, overflow: "hidden" },
  top: { flexDirection: "row", alignItems: "center", gap: space.md },
  tile: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  kicker: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  big: { color: c.ink, fontSize: 26, fontWeight: "800", fontVariant: ["tabular-nums"] },
  bigSub: { color: c.muted, fontSize: 15, fontWeight: "600" },
  cells: { flexDirection: "row", gap: 6 },
  cell: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.06)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, gap: 2 },
  cellLabel: { color: c.muted, fontSize: 11, fontWeight: "600" },
  cellValue: { color: c.ink, fontSize: 16, fontWeight: "800", fontVariant: ["tabular-nums"] },
  dim: { color: c.faint },
  accent: { color: c.primary },
});
