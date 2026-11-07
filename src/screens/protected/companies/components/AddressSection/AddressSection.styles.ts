import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { gap: 8 },
  label: { color: c.faint, fontSize: 11, fontWeight: "800", letterSpacing: 1.3 },
  input: { minHeight: 64, color: c.ink, fontSize: 15, lineHeight: 21, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, textAlignVertical: "top" },
  hint: { color: c.faint, fontSize: 12 },
  row: { flexDirection: "row", gap: 8 },
  btn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, height: 44, borderRadius: 13, backgroundColor: c.primarySoft },
  btnGlass: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  off: { opacity: 0.4 },
  text: { color: c.primary, fontSize: 13, fontWeight: "800" },
  textGlass: { color: c.ink },
});
