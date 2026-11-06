import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingHorizontal: space.md + 2,
    paddingVertical: 10,
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.sm,
    marginBottom: 6,
  },
  date: { flex: 1, gap: 2 },
  day: { color: c.ink, fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
  sub: { color: c.muted, fontSize: 11 },
  sessions: { alignItems: "flex-end", gap: 4 },
  session: { flexDirection: "row", alignItems: "center", gap: 5 },
  no: { color: c.muted, fontSize: 11, fontWeight: "700", width: 18, textAlign: "right" },
  time: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 },
  in: { backgroundColor: c.okSoft },
  out: { backgroundColor: c.surface },
  timeText: { color: c.ink, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  live: {
    color: c.primary,
    backgroundColor: c.primarySoft,
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
});
