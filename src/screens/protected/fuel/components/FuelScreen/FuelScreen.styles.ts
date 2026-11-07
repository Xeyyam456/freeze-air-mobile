import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: space.md, marginBottom: space.sm },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingTop: space.md, paddingBottom: space.sm },
  title: { color: c.ink, fontSize: 17, fontWeight: "800", paddingHorizontal: 4 },
  badge: {
    color: c.primary,
    backgroundColor: c.primarySoft,
    fontSize: 11,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  warn: { color: c.orange, backgroundColor: c.orangeSoft, fontSize: 13, lineHeight: 18, padding: space.md, borderRadius: radius.sm, overflow: "hidden" },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
  loader: { marginTop: space.xl },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
