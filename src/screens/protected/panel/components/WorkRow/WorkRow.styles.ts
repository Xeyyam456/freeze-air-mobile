import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: space.md,
    backgroundColor: c.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: c.line,
    padding: space.md,
  },
  faces: { flexDirection: "row" },
  overlap: { marginLeft: -12 },
  body: { flex: 1, gap: 3 },
  top: { flexDirection: "row", alignItems: "center", gap: space.sm },
  name: { flex: 1, color: c.ink, fontSize: 15, fontWeight: "700" },
  time: { color: c.muted, fontSize: 12, fontWeight: "600", fontVariant: ["tabular-nums"] },
  place: { flexDirection: "row", alignItems: "center", gap: 4 },
  placeText: { flex: 1, color: c.muted, fontSize: 13 },
  desc: { color: c.ink, fontSize: 14, opacity: 0.9 },
});
