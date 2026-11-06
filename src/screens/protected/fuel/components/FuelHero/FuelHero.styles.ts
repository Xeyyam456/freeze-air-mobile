import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: space.md },
  car: { flexDirection: "row", alignItems: "center", gap: space.md },
  tile: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: c.orangeSoft },
  carText: { flex: 1, gap: 3 },
  plateRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  plate: {
    color: "#0b1220",
    backgroundColor: c.white,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  model: { flex: 1, color: c.ink, fontSize: 15, fontWeight: "700" },
  details: { color: c.muted, fontSize: 12 },
  tabs: { flexDirection: "row", gap: 4, padding: 4, borderRadius: radius.sm, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  tab: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 9 },
  tabOn: { backgroundColor: c.primary },
  tabText: { color: c.muted, fontSize: 14, fontWeight: "700" },
  tabTextOn: { color: c.white },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  arrow: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  off: { opacity: 0.3 },
  label: { color: c.ink, fontSize: 16, fontWeight: "800" },
});
