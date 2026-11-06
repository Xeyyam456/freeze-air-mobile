import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    padding: space.md + 2,
    gap: space.sm + 2,
    marginBottom: space.sm,
  },
  head: { flexDirection: "row", alignItems: "center", gap: space.sm + 2 },
  name: { flex: 1, color: c.ink, fontSize: 15, fontWeight: "700" },
  count: { color: c.muted, fontSize: 13, fontWeight: "800", fontVariant: ["tabular-nums"] },
  countDone: { color: c.ok },
  line: { flexDirection: "row", alignItems: "center", gap: space.sm + 2, paddingLeft: 4 },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: c.faint,
    alignItems: "center",
    justifyContent: "center",
  },
  dotDone: { backgroundColor: c.ok, borderColor: c.ok },
  text: { flex: 1 },
  place: { color: c.primary, fontSize: 12, fontWeight: "600" },
  reason: { color: c.ink, fontSize: 13, opacity: 0.85 },
});
