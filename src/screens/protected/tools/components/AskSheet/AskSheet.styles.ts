import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.7)" },
  wrap: { ...StyleSheet.absoluteFill, justifyContent: "flex-end" },
  sheet: { backgroundColor: c.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderBottomWidth: 0, borderColor: c.glassBorder, overflow: "hidden", paddingTop: 10 },
  handle: { alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.22)", marginBottom: 10 },
  head: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: space.lg, paddingBottom: 10 },
  text: { flex: 1, gap: 2 },
  title: { color: c.ink, fontSize: 19, fontWeight: "800" },
  sub: { color: c.muted, fontSize: 13 },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  pad: { paddingHorizontal: space.lg, gap: 10 },
  search: { height: 44, borderRadius: 14, paddingHorizontal: 14, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, color: c.ink, fontSize: 15 },
  list: { flex: 1 },
  listBody: { paddingHorizontal: space.lg },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.xl },
  foot: { paddingHorizontal: space.lg, paddingTop: 10, gap: 10, borderTopWidth: 1, borderTopColor: c.line },
});
