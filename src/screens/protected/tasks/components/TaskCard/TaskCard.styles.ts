import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: space.md,
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    padding: space.md + 2,
    marginBottom: space.sm,
  },
  done: { borderColor: "rgba(52, 211, 153, 0.28)", backgroundColor: "rgba(52, 211, 153, 0.06)" },
  cancelled: { opacity: 0.55 },
  body: { flex: 1, gap: 8 },
  placeRow: { flexDirection: "row", alignItems: "center", gap: 6, minHeight: 28 },
  place: { flex: 1, fontSize: 14, fontWeight: "700" },
  group: {
    color: c.violet,
    backgroundColor: c.violetSoft,
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  reason: { color: c.ink, fontSize: 15, lineHeight: 21 },
  strike: { textDecorationLine: "line-through" },
  note: {
    color: c.orange,
    backgroundColor: c.orangeSoft,
    fontSize: 13,
    lineHeight: 18,
    padding: 8,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  noteLabel: { fontWeight: "800" },
});
