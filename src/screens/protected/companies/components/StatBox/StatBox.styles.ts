import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, gap: 2 },
  light: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  dark: { backgroundColor: "rgba(255, 255, 255, 0.08)" },
  label: { color: c.faint, fontSize: 10, fontWeight: "800", letterSpacing: 1.1, textTransform: "uppercase" },
  value: { color: c.ink, fontSize: 22, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
