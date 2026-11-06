import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  counts: { flexDirection: "row", flexWrap: "wrap", gap: 10, flex: 1 },
  count: { flexDirection: "row", alignItems: "center", gap: 4 },
  countText: { color: c.muted, fontSize: 12, fontWeight: "600" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: c.primarySoft,
  },
  pressed: { opacity: 0.7 },
  buttonText: { color: c.primary, fontSize: 13, fontWeight: "700" },
});
