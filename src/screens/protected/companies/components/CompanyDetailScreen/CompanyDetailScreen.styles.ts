import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: layout.gutter + 8, paddingBottom: 130 },
  header: { gap: 16, marginBottom: 14 },
  tabs: { flexDirection: "row", gap: 8 },
  tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 44, borderRadius: 22, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  tabOn: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.5)" },
  tabText: { color: c.muted, fontSize: 14, fontWeight: "800" },
  tabTextOn: { color: c.ink },
  tabCount: { color: c.faint, fontSize: 12, fontWeight: "800" },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: 36 },
  loader: { marginVertical: 40 },
  gap: { height: space.sm },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
