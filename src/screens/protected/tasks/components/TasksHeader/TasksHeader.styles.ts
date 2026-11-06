import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: space.md, paddingTop: space.xs },
  row: { flexDirection: "row", alignItems: "flex-end", gap: space.md },
  text: { flex: 1 },
  date: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  title: { color: c.ink, fontSize: 28, fontWeight: "800", letterSpacing: -0.4, marginTop: 2 },
  score: { alignItems: "flex-end" },
  value: { color: c.ink, fontSize: 24, fontWeight: "800", fontVariant: ["tabular-nums"], letterSpacing: -0.3 },
  ok: { color: c.ok },
  label: { color: c.muted, fontSize: 11, fontWeight: "600" },
  track: { height: 4, borderRadius: 2, backgroundColor: c.line, overflow: "hidden" },
  fill: { height: 4, borderRadius: 2, backgroundColor: c.primary },
  fillOk: { backgroundColor: c.ok },
});
