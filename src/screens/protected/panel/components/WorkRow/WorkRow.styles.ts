import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: space.md },
  rail: { width: 46, alignItems: "center" },
  time: { color: c.muted, fontSize: 12, fontWeight: "700", fontVariant: ["tabular-nums"], marginTop: 14 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: c.primary, marginTop: 8, borderWidth: 2, borderColor: c.bg },
  line: { flex: 1, width: StyleSheet.hairlineWidth * 2, backgroundColor: c.glassBorder, marginTop: 4 },
  card: {
    flex: 1,
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    padding: space.md,
    gap: 4,
    marginBottom: space.sm,
  },
  top: { flexDirection: "row", alignItems: "center", gap: space.sm },
  name: { flex: 1, color: c.ink, fontSize: 15, fontWeight: "700" },
  place: { color: c.primary, fontSize: 13, fontWeight: "600" },
  desc: { color: c.ink, fontSize: 14, opacity: 0.85, lineHeight: 19 },
});
