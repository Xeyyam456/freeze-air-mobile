import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: space.md, marginBottom: space.md },
  search: { flexDirection: "row", alignItems: "center", gap: space.sm, height: 44, paddingHorizontal: space.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md },
  input: { flex: 1, color: c.ink, fontSize: 15, padding: 0 },
  gap: { height: space.md },
  // Gün başlığı: ortada kiçik şüşə həb (WhatsApp kimi)
  dayRow: { alignItems: "center", paddingTop: space.sm },
  day: { color: c.muted, fontSize: 12, fontWeight: "800", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, overflow: "hidden", backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.xl, paddingHorizontal: space.lg },
  loader: { marginTop: space.xl },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
