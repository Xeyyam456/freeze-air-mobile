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
  body: { paddingHorizontal: space.lg, gap: 16 },
  line: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: { color: c.ink, fontSize: 14, fontWeight: "700", width: 92 },
  input: { width: 92, height: 44, borderRadius: 12, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, color: c.ink, fontSize: 17, fontWeight: "700", textAlign: "center", paddingVertical: 0 },
  bad: { borderColor: c.danger },
  unit: { color: c.muted, fontSize: 14, fontWeight: "600" },
  hint: { color: c.muted, fontSize: 13 },
  hintBad: { color: c.danger, fontWeight: "700" },
  note: { height: 44, borderRadius: 14, paddingHorizontal: 14, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, color: c.ink, fontSize: 15 },
});
