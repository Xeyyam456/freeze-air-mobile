import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  strip: {
    flexDirection: "row",
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    paddingVertical: space.lg,
  },
  cell: { flex: 1, alignItems: "center", gap: 2, paddingHorizontal: 4 },
  divider: { width: StyleSheet.hairlineWidth, backgroundColor: c.glassBorder, marginVertical: 6 },
  value: { color: c.ink, fontSize: 26, fontWeight: "800", fontVariant: ["tabular-nums"], letterSpacing: -0.3 },
  label: { color: c.ink, fontSize: 13, fontWeight: "600", opacity: 0.9 },
  sub: { color: c.muted, fontSize: 11, fontWeight: "600", textAlign: "center" },
});
