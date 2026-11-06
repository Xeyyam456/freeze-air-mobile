import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: c.violetSoft,
    borderRadius: 999,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 12,
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  stack: { flexDirection: "row" },
  face: { borderRadius: 12, borderWidth: 1.5, borderColor: c.surface },
  overlap: { marginLeft: -8 },
  names: { color: c.ink, fontSize: 12, fontWeight: "600", flexShrink: 1 },
});
