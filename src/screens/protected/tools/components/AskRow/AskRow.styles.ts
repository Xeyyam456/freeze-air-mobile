import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { paddingVertical: space.md, gap: 10, borderBottomWidth: 1, borderBottomColor: c.line },
  off: { opacity: 0.5 },
  main: { flexDirection: "row", alignItems: "center", gap: space.md },
  box: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: c.faint, alignItems: "center", justifyContent: "center" },
  boxOn: { backgroundColor: c.primary, borderColor: c.primary },
  text: { flex: 1, gap: 2 },
  name: { color: c.ink, fontSize: 15, fontWeight: "700" },
  sub: { fontSize: 12, fontWeight: "600" },
  qtyWrap: { paddingLeft: 36, gap: 4 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: { width: 84, height: 40, borderRadius: 12, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, color: c.ink, fontSize: 16, fontWeight: "700", textAlign: "center", paddingVertical: 0 },
  bad: { borderColor: c.danger },
  unit: { color: c.muted, fontSize: 13, fontWeight: "600" },
  conv: { color: c.muted, fontSize: 12 },
});
