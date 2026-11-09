import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 120, gap: space.lg },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
  title: { color: c.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.5, paddingHorizontal: 4 },
  group: { gap: space.sm },
  groupTitle: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", paddingHorizontal: 6 },
  version: { color: c.faint, fontSize: 11, fontWeight: "600", textAlign: "center", marginTop: space.sm },
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, overflow: "hidden" },
});
