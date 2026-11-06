import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
    gap: space.sm,
  },
  head: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", paddingHorizontal: space.sm },
  grid: { flexDirection: "row", flexWrap: "wrap", rowGap: space.md },
  cell: { width: "33.33%", alignItems: "center", gap: 2 },
  value: { fontSize: 22, fontWeight: "800", fontVariant: ["tabular-nums"] },
  label: { color: c.muted, fontSize: 11, fontWeight: "600" },
});
