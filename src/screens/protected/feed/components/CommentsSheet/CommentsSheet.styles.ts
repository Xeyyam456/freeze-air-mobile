import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.6)" },
  // Alt panel (bottom sheet): ekranın altından açılır, klaviatura açılanda yuxarı qalxır
  wrap: { ...StyleSheet.absoluteFill, justifyContent: "flex-end" },
  sheet: { backgroundColor: c.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderBottomWidth: 0, borderColor: c.glassBorder, overflow: "hidden" },
  // Tutacaq sahəsi geniş (barmaq asan tutsun), xəttin özü nazik
  handleArea: { alignItems: "center", paddingTop: 10, paddingBottom: 6 },
  handle: { width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.22)" },
  head: { flexDirection: "row", alignItems: "center", gap: space.sm, paddingHorizontal: space.lg, paddingTop: space.md, paddingBottom: space.md },
  emoji: { fontSize: 22 },
  title: { flex: 1, color: c.ink, fontSize: 18, fontWeight: "800" },
  count: { color: c.muted, fontSize: 14, fontWeight: "800", backgroundColor: c.glass, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 999, overflow: "hidden" },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  list: { flex: 1 },
  listContent: { paddingHorizontal: space.lg, paddingVertical: space.sm, gap: space.md },
  // Söhbət sətri: başqalarının qabarcığı solda (şəkil ilə), mənimki sağda mavi tonda
  row: { flexDirection: "row", alignItems: "flex-end", gap: space.sm },
  rowMine: { flexDirection: "row-reverse" },
  bubble: { maxWidth: "78%", backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: 18, borderBottomLeftRadius: 6, paddingHorizontal: 14, paddingVertical: 9, gap: 2 },
  bubbleMine: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.4)", borderBottomLeftRadius: 18, borderBottomRightRadius: 6 },
  name: { color: c.primary, fontSize: 12, fontWeight: "800" },
  body: { color: c.ink, fontSize: 15, lineHeight: 21 },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 1 },
  when: { color: c.faint, fontSize: 11, fontWeight: "600" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: space.sm, paddingVertical: space.xl },
  emptyEmoji: { fontSize: 44, opacity: 0.6 },
  emptyText: { color: c.muted, fontSize: 14, textAlign: "center" },
  inputRow: { flexDirection: "row", alignItems: "flex-end", gap: space.sm, paddingHorizontal: space.md, paddingTop: space.sm, borderTopWidth: 1, borderTopColor: c.line, backgroundColor: c.surface },
  input: { flex: 1, minHeight: 46, maxHeight: 110, color: c.ink, fontSize: 15, paddingHorizontal: 18, paddingVertical: 12, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: 23 },
  send: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  sendOff: { backgroundColor: c.surface2 },
});
