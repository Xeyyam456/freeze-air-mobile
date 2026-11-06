import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: 6 },
  week: { flexDirection: "row", gap: 4 },
  weekday: { flex: 1, textAlign: "center", color: c.muted, fontSize: 11, fontWeight: "700", paddingVertical: 4 },
  cell: { flex: 1, aspectRatio: 1 },
  day: { alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "rgba(255, 255, 255, 0.05)" },
  inside: { backgroundColor: c.primarySoft },
  edge: { backgroundColor: c.primary },
  today: { borderWidth: 1.5, borderColor: c.primary },
  num: { color: c.ink, fontSize: 14, fontWeight: "700", fontVariant: ["tabular-nums"] },
  sunday: { color: c.faint },
  numOn: { color: c.white },
});
