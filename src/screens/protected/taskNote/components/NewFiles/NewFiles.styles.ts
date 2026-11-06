import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: { color: c.muted, fontSize: 13, fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, paddingTop: 6, paddingRight: 6 },
});
