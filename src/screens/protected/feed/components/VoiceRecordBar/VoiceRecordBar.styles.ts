import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  bar: { flex: 1, height: 46, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 18, borderRadius: 23, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: c.danger },
  time: { color: c.ink, fontSize: 16, fontWeight: "800", fontVariant: ["tabular-nums"], minWidth: 44 },
  hint: { flex: 1, color: c.muted, fontSize: 12, fontWeight: "600", textAlign: "right" },
  trash: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.dangerSoft },
});
