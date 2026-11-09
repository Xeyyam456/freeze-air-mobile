import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  line: { paddingVertical: space.md, gap: 10, borderBottomWidth: 1, borderBottomColor: c.line },
  name: { color: c.ink, fontSize: 15, fontWeight: "800" },
  sub: { color: c.muted, fontSize: 12, marginTop: -6 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: { color: c.ink, fontSize: 14, fontWeight: "700", width: 92 },
  input: { width: 92, height: 44, borderRadius: 12, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, color: c.ink, fontSize: 17, fontWeight: "700", textAlign: "center", paddingVertical: 0 },
  bad: { borderColor: c.danger },
  unit: { color: c.muted, fontSize: 14, fontWeight: "600" },
  hint: { color: c.muted, fontSize: 13 },
  hintBad: { color: c.danger, fontWeight: "700" },
});
