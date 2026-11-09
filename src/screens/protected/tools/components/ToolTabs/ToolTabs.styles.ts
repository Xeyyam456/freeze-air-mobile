import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 4, padding: 4, borderRadius: 16, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  tab: { flex: 1, height: 38, borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  on: { backgroundColor: c.primarySoft },
  text: { color: c.muted, fontSize: 14, fontWeight: "700" },
  textOn: { color: c.primary },
  count: { color: c.faint, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
