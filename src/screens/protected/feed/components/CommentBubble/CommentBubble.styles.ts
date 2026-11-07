import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  // Söhbət sətri: başqalarının qabarcığı solda (şəkil ilə), mənimki sağda mavi tonda
  row: { flexDirection: "row", alignItems: "flex-end", gap: space.sm },
  rowMine: { flexDirection: "row-reverse" },
  bubble: { maxWidth: "78%", backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: 18, borderBottomLeftRadius: 6, paddingHorizontal: 14, paddingVertical: 9, gap: 2 },
  bubbleMine: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.4)", borderBottomLeftRadius: 18, borderBottomRightRadius: 6 },
  name: { color: c.primary, fontSize: 12, fontWeight: "800" },
  body: { color: c.ink, fontSize: 15, lineHeight: 21 },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 1 },
  when: { color: c.faint, fontSize: 11, fontWeight: "600" },
});
