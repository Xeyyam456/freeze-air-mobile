import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md, gap: space.md },
  pressed: { opacity: 0.8 },
  top: { flexDirection: "row", alignItems: "center", gap: space.md },
  text: { flex: 1, gap: 2 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: space.sm },
  name: { flexShrink: 1, color: c.ink, fontSize: 16, fontWeight: "800" },
  badge: { color: c.primary, backgroundColor: c.primarySoft, fontSize: 11, fontWeight: "700", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, overflow: "hidden" },
  sub: { color: c.muted, fontSize: 13 },
  status: { flexDirection: "row" },
  stats: { flexDirection: "row", gap: 6 },
  stat: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8 },
  statLabel: { color: c.muted, fontSize: 11, fontWeight: "600" },
  statValue: { color: c.ink, fontSize: 17, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
