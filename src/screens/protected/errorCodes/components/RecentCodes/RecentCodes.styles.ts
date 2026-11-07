import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  kicker: { color: c.faint, fontSize: 11, fontWeight: "800", letterSpacing: 1.4, marginBottom: 8, paddingLeft: 4 },
  row: { gap: 8, paddingRight: 8 },
  chip: { flexDirection: "row", alignItems: "center", gap: 10, paddingLeft: 6, paddingRight: 14, height: 44, borderRadius: 22, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  plate: { minWidth: 34, height: 32, paddingHorizontal: 6, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  code: { color: c.primary, fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
  model: { color: c.muted, fontSize: 12, fontWeight: "600" },
});
