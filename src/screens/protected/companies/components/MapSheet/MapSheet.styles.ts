import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.7)" },
  wrap: { ...StyleSheet.absoluteFill, justifyContent: "flex-end" },
  sheet: { backgroundColor: c.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderBottomWidth: 0, borderColor: c.glassBorder, overflow: "hidden", paddingTop: 10 },
  handle: { alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.22)", marginBottom: 12 },
  head: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingHorizontal: space.lg, paddingBottom: 12 },
  text: { flex: 1, gap: 3 },
  title: { color: c.ink, fontSize: 18, fontWeight: "800" },
  addr: { color: c.muted, fontSize: 13, lineHeight: 18 },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  body: { marginHorizontal: space.lg, marginBottom: 12 },
  none: { height: 220, alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 18, backgroundColor: c.glass },
  noneText: { color: c.muted, fontSize: 14, textAlign: "center", paddingHorizontal: 20 },
  note: { color: c.faint, fontSize: 12, marginHorizontal: space.lg, marginBottom: 10 },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, height: 50, borderRadius: 15, backgroundColor: c.primary, marginHorizontal: space.lg },
  navText: { color: c.white, fontSize: 15, fontWeight: "800" },
});
