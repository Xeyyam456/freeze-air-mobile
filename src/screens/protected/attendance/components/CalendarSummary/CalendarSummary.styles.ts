import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: 6 },
  row: { flexDirection: "row", gap: 6 },
  cell: { flex: 1, alignItems: "center", backgroundColor: c.surface, borderRadius: 12, paddingVertical: 8 },
  value: { fontSize: 17, fontWeight: "800", fontVariant: ["tabular-nums"] },
  label: { color: c.muted, fontSize: 11, fontWeight: "600" },
  pill: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 },
  pillValue: { fontSize: 16, fontWeight: "800", fontVariant: ["tabular-nums"] },
  sunday: { backgroundColor: "rgba(148, 163, 184, 0.15)" },
  sundayText: { color: "#cbd5e1", fontSize: 12, fontWeight: "700" },
  total: { backgroundColor: c.okSoft },
  totalText: { color: c.ok, fontSize: 12, fontWeight: "700" },
  none: {
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: "rgba(148, 163, 184, 0.15)",
    borderRadius: 12,
    paddingVertical: 9,
    overflow: "hidden",
  },
});
