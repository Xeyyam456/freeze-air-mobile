import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.65)" },
  wrap: { ...StyleSheet.absoluteFill, justifyContent: "flex-end" },
  sheet: { backgroundColor: c.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderBottomWidth: 0, borderColor: c.glassBorder, paddingHorizontal: space.lg, paddingTop: 10 },
  handle: { alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.22)", marginBottom: 14 },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  title: { color: c.ink, fontSize: 19, fontWeight: "800" },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  search: { height: 46, paddingHorizontal: 16, borderRadius: 23, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, color: c.ink, fontSize: 15, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: c.line },
  name: { flex: 1, color: c.ink, fontSize: 16, fontWeight: "600" },
  nameOn: { fontWeight: "800" },
  count: { color: c.faint, fontSize: 12, fontWeight: "700", fontVariant: ["tabular-nums"] },
  check: { width: 22, alignItems: "center" },
  empty: { color: c.muted, textAlign: "center", paddingVertical: 28 },
});
