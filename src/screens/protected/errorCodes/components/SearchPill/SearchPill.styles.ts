import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  pill: { flexDirection: "row", alignItems: "center", gap: 12, height: 56, paddingLeft: 18, paddingRight: 10, borderRadius: 28, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderTopColor: "rgba(255, 255, 255, 0.16)" },
  pillOn: { borderColor: "rgba(79, 141, 255, 0.55)", backgroundColor: "rgba(79, 141, 255, 0.07)" },
  input: { flex: 1, color: c.ink, fontSize: 16, fontWeight: "600", paddingVertical: 0 },
  clear: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.08)" },
  hint: { color: c.faint, fontSize: 12, fontWeight: "600", paddingLeft: 20, marginTop: 8 },
});
