import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  text: { flexShrink: 1, color: c.primary, fontSize: 12, fontWeight: "700" },
  name: { color: c.primary, fontSize: 12, fontWeight: "700", paddingLeft: 18 },
});
