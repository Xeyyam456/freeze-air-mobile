import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

// Yer adının rəngi: usta adı (ağ) və mətndən fərqlənsin
export const PLACE = "#22d3ee";

export const styles = StyleSheet.create({
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.lg, padding: space.md, gap: space.md },
  head: { flexDirection: "row", alignItems: "center", gap: space.md },
  who: { flex: 1, gap: 3 },
  name: { color: c.ink, fontSize: 15, fontWeight: "800" },
  placeRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  place: { flexShrink: 1, color: PLACE, fontSize: 14, fontWeight: "800" },
  company: { color: c.muted, fontSize: 12, fontWeight: "600" },
  time: { alignSelf: "flex-start", color: c.muted, fontSize: 12, fontWeight: "700", fontVariant: ["tabular-nums"], paddingTop: 2 },
  desc: { color: c.ink, opacity: 0.85, fontSize: 14, lineHeight: 20 },
  divider: { height: 1, backgroundColor: c.line, marginHorizontal: -space.md, marginBottom: -4 },
});
