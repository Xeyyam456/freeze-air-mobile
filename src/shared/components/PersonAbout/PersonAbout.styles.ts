import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", gap: space.md },
  list: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingHorizontal: space.md, paddingVertical: 10 },
  line: { borderTopWidth: 1, borderTopColor: c.line },
  tile: { width: 36, height: 36, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  rowText: { flex: 1, gap: 1 },
  rowLabel: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 0.4 },
  value: { color: c.ink, fontSize: 15, fontWeight: "700" },
  plateRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  plate: { color: c.ink, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 1, overflow: "hidden", fontSize: 14, fontWeight: "800" },
  model: { color: c.muted, fontSize: 13 },
});
