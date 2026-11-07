import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 120, gap: space.sm },
  title: { color: c.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.5, paddingHorizontal: 4 },
  sub: { color: c.muted, fontSize: 14, paddingHorizontal: 4, marginBottom: space.md },
  list: { gap: space.sm },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
