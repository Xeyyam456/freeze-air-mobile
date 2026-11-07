import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: space.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md },
  me: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.45)" },
  pressed: { opacity: 0.8 },
  ring: { padding: 2, borderWidth: 2, borderRadius: 999 },
  text: { flex: 1, gap: 3 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: space.sm },
  name: { flexShrink: 1, color: c.ink, fontSize: 16, fontWeight: "800" },
  badge: { color: c.primary, backgroundColor: c.primarySoft, fontSize: 10, fontWeight: "800", paddingHorizontal: 7, paddingVertical: 1, borderRadius: 7, overflow: "hidden" },
  sub: { color: c.muted, fontSize: 13 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 1 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  status: { flexShrink: 1, fontSize: 12, fontWeight: "700" },
  partners: { gap: 1 },
  partnerName: { color: c.primary, fontSize: 12, fontWeight: "700", paddingLeft: 18 },
  partner: { flexShrink: 1, color: c.primary, fontSize: 12, fontWeight: "700" },
  stats: { flexDirection: "row", alignItems: "center", gap: space.md },
  divider: { width: 1, alignSelf: "stretch", marginVertical: 4, backgroundColor: c.line },
  stat: { alignItems: "center", minWidth: 36, gap: 1 },
  statValue: { color: c.faint, fontSize: 19, fontWeight: "800", fontVariant: ["tabular-nums"] },
  statLabel: { color: c.muted, fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },
});
