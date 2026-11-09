import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2, padding: 2, borderRadius: 10, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  item: { height: 28, paddingHorizontal: 10, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  active: { backgroundColor: c.primarySoft },
  text: { color: c.muted, fontSize: 12, fontWeight: "700" },
  textOn: { color: c.primary },
});
