import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

// Balansın rəngi: borc (qırmızı), artıq (narıncı), bərabər (yaşıl)
export const TONE = { debt: "#fb7185", over: c.orange, even: c.ok } as const;

export const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderWidth: 1, borderColor: c.glassBorder, overflow: "hidden" },
  today: { padding: space.lg, gap: 6 },
  todayHead: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  kicker: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  todayNums: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: space.md },
  km: { color: c.ink, fontSize: 30, fontWeight: "800", fontVariant: ["tabular-nums"] },
  unit: { color: c.muted, fontSize: 15, fontWeight: "700" },
  liters: { color: c.muted, fontSize: 14, fontWeight: "600", fontVariant: ["tabular-nums"] },
  cost: { color: c.ok, fontSize: 24, fontWeight: "800", fontVariant: ["tabular-nums"] },
  hint: { color: c.muted, fontSize: 12 },
  period: { padding: space.lg, gap: 6, borderTopWidth: 1, borderTopColor: c.line, backgroundColor: "rgba(79, 141, 255, 0.07)" },
  periodRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: space.sm },
  total: { color: c.ink, fontSize: 30, fontWeight: "800", fontVariant: ["tabular-nums"] },
  chips: { flexShrink: 1, color: c.muted, fontSize: 12, fontWeight: "600", textAlign: "right" },
  balance: { fontSize: 12, fontWeight: "700", marginTop: 2 },
  cells: { flexDirection: "row", gap: 6 },
  cell: { flex: 1, alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.06)", borderRadius: 10, paddingVertical: 7, paddingHorizontal: 4 },
  cellLabel: { color: c.muted, fontSize: 10, fontWeight: "600" },
  cellValue: { fontSize: 13, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
