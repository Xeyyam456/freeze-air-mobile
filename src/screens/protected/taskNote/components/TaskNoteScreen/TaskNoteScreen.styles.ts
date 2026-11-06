import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  header: { flexDirection: "row", alignItems: "center", gap: space.md, paddingHorizontal: layout.gutter + 4, paddingVertical: space.md },
  close: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  headText: { flex: 1 },
  title: { color: c.ink, fontSize: 18, fontWeight: "800" },
  sub: { color: c.primary, fontSize: 13, fontWeight: "600" },
  content: { paddingHorizontal: layout.gutter + 4, paddingBottom: space.xl, gap: space.lg },
  reason: { color: c.muted, fontSize: 14, lineHeight: 20 },
  field: { gap: 6 },
  label: { color: c.muted, fontSize: 13, fontWeight: "600" },
  input: {
    minHeight: 110,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.surface2,
    color: c.ink,
    fontSize: 15,
    lineHeight: 21,
    padding: 12,
  },
  footer: { paddingHorizontal: layout.gutter + 4, paddingTop: space.sm, borderTopWidth: 1, borderTopColor: c.line, backgroundColor: c.bg },
});
