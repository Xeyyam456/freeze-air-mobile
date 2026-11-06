import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.sm,
  },
  kicker: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2, marginBottom: space.sm },
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 12 },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.glassBorder },
  rank: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: "hidden",
    textAlign: "center",
    lineHeight: 26,
    fontSize: 12,
    fontWeight: "800",
    color: c.muted,
    backgroundColor: c.glass,
  },
  rankFirst: { color: c.white, backgroundColor: c.primary },
  name: { flex: 1, color: c.ink, fontSize: 15, fontWeight: "600" },
  count: { color: c.ink, fontSize: 15, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
