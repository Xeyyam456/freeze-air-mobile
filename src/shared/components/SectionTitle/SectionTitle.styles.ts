import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.9, textTransform: "uppercase" },
  right: { marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 8 },
  count: {
    color: c.ink,
    backgroundColor: c.surface2,
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
});
