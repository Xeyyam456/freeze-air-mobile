import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

// Vəziyyət: yazı və rənglər (web constants/status)
export const STATUS: Record<string, { text: string; fg: string; bg: string }> = {
  pending: { text: "Gözləyir", fg: c.primary, bg: c.primarySoft },
  approved: { text: "Təsdiqləndi", fg: c.ok, bg: c.okSoft },
  rejected: { text: "Rədd edildi", fg: c.danger, bg: c.dangerSoft },
  cancelled: { text: "Ləğv etdin", fg: c.muted, bg: c.surface2 },
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    marginBottom: space.sm,
    overflow: "hidden",
  },
  sending: { opacity: 0.6 },
  bar: { width: 4 },
  body: { flex: 1, padding: space.md, gap: 5 },
  head: { flexDirection: "row", alignItems: "center", gap: 8 },
  range: { color: c.ink, fontSize: 16, fontWeight: "800", fontVariant: ["tabular-nums"] },
  days: { flex: 1, color: c.muted, fontSize: 13 },
  status: { fontSize: 11, fontWeight: "800", paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999, overflow: "hidden" },
  now: {
    alignSelf: "flex-start",
    color: c.orange,
    backgroundColor: c.orangeSoft,
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  reason: { color: c.ink, fontSize: 14, lineHeight: 19 },
  meta: { color: c.faint, fontSize: 11, lineHeight: 15 },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 4,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: c.surface2,
  },
  danger: { backgroundColor: c.dangerSoft },
  actionText: { color: c.ink, fontSize: 13, fontWeight: "700" },
});
