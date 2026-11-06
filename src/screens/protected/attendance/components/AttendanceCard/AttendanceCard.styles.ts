import { StyleSheet } from "react-native";
import type { TodayBadge } from "@typings/attendance";
import { c, radius, space } from "@theme/colors";

// Bu günün nişanının rəngi (web todayBadge sinifləri)
export const TONE: Record<TodayBadge["tone"], { color: string; backgroundColor: string }> = {
  ok: { color: c.ok, backgroundColor: c.okSoft },
  ink: { color: c.ink, backgroundColor: c.surface2 },
  violet: { color: c.violet, backgroundColor: c.violetSoft },
  muted: { color: c.muted, backgroundColor: c.surface2 },
  danger: { color: c.white, backgroundColor: c.danger },
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    padding: space.md + 2,
    marginBottom: space.sm,
    gap: space.md,
  },
  me: { borderColor: "rgba(79, 141, 255, 0.45)", backgroundColor: "rgba(79, 141, 255, 0.06)" },
  pressed: { opacity: 0.8 },
  head: { flexDirection: "row", alignItems: "center", gap: space.md },
  who: { flex: 1, gap: 2 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { color: c.ink, fontSize: 15, fontWeight: "700", flexShrink: 1 },
  meTag: {
    color: c.primary,
    backgroundColor: c.primarySoft,
    fontSize: 11,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  sub: { color: c.muted, fontSize: 12 },
  cells: { flexDirection: "row", gap: 6 },
  cell: { flex: 1, alignItems: "center", backgroundColor: c.surface, borderRadius: 12, paddingVertical: 8 },
  cellLabel: { color: c.muted, fontSize: 11, fontWeight: "600" },
  cellValue: { fontSize: 16, fontWeight: "800", fontVariant: ["tabular-nums"], marginTop: 1 },
  today: { gap: space.sm, borderTopWidth: 1, borderTopColor: c.line, paddingTop: space.md },
  badge: {
    alignSelf: "flex-end",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
});
