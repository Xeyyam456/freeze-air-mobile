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
  body: { paddingHorizontal: space.lg, paddingBottom: space.lg, gap: 20 },
});
