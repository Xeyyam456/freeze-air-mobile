import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: layout.gutter + 8, paddingBottom: 130 },
  header: { gap: 16, marginBottom: 14 },
  gap: { height: space.md },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: 40 },
  loader: { marginVertical: 40 },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
