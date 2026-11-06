import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: space.md, marginBottom: space.sm },
  title: { color: c.ink, fontSize: 17, fontWeight: "800", paddingHorizontal: 4, paddingTop: space.md, paddingBottom: space.sm },
  month: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", paddingHorizontal: 6, paddingTop: space.sm, paddingBottom: space.sm },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
  loader: { marginTop: space.xl },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg, opacity: 0.94 },
});
