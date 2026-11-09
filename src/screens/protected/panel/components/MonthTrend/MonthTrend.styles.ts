import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const H = 110;

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
  side: { alignItems: "flex-end" },
  sideValue: { color: c.primary, fontSize: 22, fontWeight: "800", fontVariant: ["tabular-nums"] },
  max: { color: c.muted, fontSize: 11, fontWeight: "600" },
  chart: { flexDirection: "row", alignItems: "flex-end" },
  // Ortada zəif köməkçi xətt (yarı hündürlük)
  guide: { position: "absolute", left: 0, right: 0, top: "50%", height: StyleSheet.hairlineWidth, backgroundColor: c.line },
  axis: { flexDirection: "row", justifyContent: "space-between" },
  tick: { color: c.faint, fontSize: 10, fontWeight: "600" },
});
