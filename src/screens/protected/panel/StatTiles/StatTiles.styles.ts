import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
    backgroundColor: c.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: c.line,
    padding: space.lg,
    gap: 4,
  },
  icon: { width: 34, height: 34, borderRadius: radius.sm, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  value: { color: c.ink, fontSize: 26, fontWeight: "800", fontVariant: ["tabular-nums"] },
  label: { color: c.muted, fontSize: 13, fontWeight: "600" },
  sub: { color: c.muted, fontSize: 12 },
});
