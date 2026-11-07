import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər (tab bar üzən kartdır)
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  gap: { height: space.sm },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
  loader: { marginTop: space.xl },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", marginTop: space.xl },
});
