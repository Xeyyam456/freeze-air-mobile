import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  // Alt boşluq tab bar-ın hündürlüyü qədər
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: space.md, marginBottom: space.sm },
  confirm: { gap: space.sm },
  gap: { height: space.sm },
  titleRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", paddingHorizontal: 4, paddingTop: space.lg, paddingBottom: 4 },
  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  link: { color: c.primary, fontSize: 13, fontWeight: "700", paddingHorizontal: 4 },
  bar: { position: "absolute", left: 16, right: 16, height: 52, borderRadius: 16, backgroundColor: c.primary, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, elevation: 8 },
  barText: { color: c.white, fontSize: 15, fontWeight: "800" },
  title: { color: c.ink, fontSize: 17, fontWeight: "800", paddingHorizontal: 4 },
  sub: { color: c.muted, fontSize: 12 },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
  loader: { marginTop: space.xl },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
