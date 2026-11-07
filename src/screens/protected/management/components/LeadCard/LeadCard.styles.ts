import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { alignItems: "center", gap: space.sm, padding: space.lg, borderRadius: radius.lg, borderWidth: 1, borderColor: c.glassBorder, overflow: "hidden" },
  badge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: c.primarySoft, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { color: c.primary, fontSize: 11, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" },
  name: { color: c.ink, fontSize: 22, fontWeight: "800", textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  meta: { color: c.muted, fontSize: 14 },
});
