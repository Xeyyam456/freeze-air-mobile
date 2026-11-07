import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  // Söhbət sətri: başqalarının qabarcığı solda (şəkil ilə), mənimki sağda mavi tonda
  row: { flexDirection: "row", alignItems: "flex-end", gap: space.sm },
  rowMine: { flexDirection: "row-reverse" },
  bubble: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: 18, borderBottomLeftRadius: 6, paddingHorizontal: 14, paddingVertical: 9, gap: 2 },
  bubbleMine: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.4)", borderBottomLeftRadius: 18, borderBottomRightRadius: 6 },
  name: { color: c.primary, fontSize: 12, fontWeight: "800" },
  body: { color: c.ink, fontSize: 15, lineHeight: 21 },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 1 },
  col: { maxWidth: "78%", gap: 4, alignItems: "flex-start" },
  colMine: { alignItems: "flex-end" },
  rx: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
  chip: { flexDirection: "row", alignItems: "center", gap: 4, height: 26, paddingHorizontal: 9, borderRadius: 13, borderWidth: 1, borderColor: c.glassBorder, backgroundColor: c.surface2 },
  chipOn: { borderColor: "rgba(79, 141, 255, 0.5)", backgroundColor: c.primarySoft },
  chipEmoji: { fontSize: 13 },
  chipCount: { color: c.muted, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  smile: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  pickRow: { flexDirection: "row", gap: 2, padding: 4, borderRadius: 16, backgroundColor: c.surface2, borderWidth: 1, borderColor: c.glassBorder },
  pick: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  pickOn: { backgroundColor: c.primarySoft },
  pickEmoji: { fontSize: 24 },
  when: { color: c.faint, fontSize: 11, fontWeight: "600" },
});
