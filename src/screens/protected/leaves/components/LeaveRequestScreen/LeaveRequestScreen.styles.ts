import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  pad: { paddingHorizontal: layout.gutter },
  content: { paddingHorizontal: layout.gutter, paddingTop: space.md, paddingBottom: space.xl, gap: space.md },
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.lg, padding: space.md },
  summary: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    backgroundColor: c.primarySoft,
    borderRadius: radius.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  range: { color: c.ink, fontSize: 18, fontWeight: "800", fontVariant: ["tabular-nums"] },
  days: { color: c.primary, fontSize: 13, fontWeight: "700" },
  field: { gap: 6 },
  label: { color: c.muted, fontSize: 13, fontWeight: "600" },
  optional: { color: c.faint, fontWeight: "500" },
  input: {
    minHeight: 80,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.surface2,
    color: c.ink,
    fontSize: 15,
    padding: 12,
  },
  footer: { paddingHorizontal: layout.gutter, paddingTop: space.sm, borderTopWidth: 1, borderTopColor: c.line, backgroundColor: c.bg },
});
