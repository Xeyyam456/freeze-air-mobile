import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: 4, marginBottom: space.md },
  title: { color: c.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.5, paddingHorizontal: 4 },
  sub: { color: c.muted, fontSize: 13, paddingHorizontal: 4, marginBottom: space.sm },
  day: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", paddingHorizontal: 6, paddingTop: space.sm, paddingBottom: space.sm },
  loader: { marginTop: space.xl },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg, opacity: 0.94 },
});
