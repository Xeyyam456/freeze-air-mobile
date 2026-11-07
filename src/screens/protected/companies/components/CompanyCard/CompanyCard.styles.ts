import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { gap: 14, padding: 16, borderRadius: 20, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderTopColor: "rgba(255, 255, 255, 0.12)" },
  head: { flexDirection: "row", alignItems: "center", gap: 12 },
  text: { flex: 1, gap: 2 },
  name: { color: c.ink, fontSize: 16, fontWeight: "800", lineHeight: 21 },
  sub: { color: c.muted, fontSize: 12, fontWeight: "600" },
  arrow: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.07)" },
  stats: { flexDirection: "row", gap: 8 },
  addr: { flex: 1.7, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, backgroundColor: "rgba(255, 255, 255, 0.05)", gap: 2 },
  addrLabel: { color: c.faint, fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
  addrText: { color: c.ink, fontSize: 13, fontWeight: "700", lineHeight: 18 },
  foot: { flexDirection: "row", alignItems: "center", gap: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: c.line },
  item: { flexDirection: "row", alignItems: "center", gap: 6, flexShrink: 1 },
  itemText: { color: c.muted, fontSize: 13, flexShrink: 1 },
});
