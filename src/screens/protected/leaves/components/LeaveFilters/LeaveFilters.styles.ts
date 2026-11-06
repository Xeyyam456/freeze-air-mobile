import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: space.md },
  chip: {
    width: "48.9%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
  },
  on: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.5)" },
  label: { color: c.muted, fontSize: 13, fontWeight: "700" },
  labelOn: { color: c.ink },
  count: { color: c.muted, fontSize: 11, fontWeight: "800", backgroundColor: c.surface2, paddingHorizontal: 7, paddingVertical: 1, borderRadius: 999, overflow: "hidden" },
  countOn: { color: c.white, backgroundColor: c.primary },
});
