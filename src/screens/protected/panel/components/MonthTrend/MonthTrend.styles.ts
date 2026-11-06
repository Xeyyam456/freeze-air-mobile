import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const H = 120;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    padding: space.lg,
    gap: space.md,
  },
  head: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  kicker: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  title: { color: c.ink, fontSize: 19, fontWeight: "800", marginTop: 2 },
  max: { color: c.muted, fontSize: 12, fontWeight: "600" },
  axis: { flexDirection: "row", justifyContent: "space-between" },
  tick: { color: c.faint, fontSize: 10, fontWeight: "600" },
});
