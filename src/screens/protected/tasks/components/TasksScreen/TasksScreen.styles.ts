import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər (tab bar üzən kartdır)
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: space.lg, marginBottom: space.sm },
  title: { paddingTop: space.lg, paddingBottom: space.sm + 2 },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
  loader: { marginTop: space.xl },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg, opacity: 0.94 },
});
