import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.65)" },
  wrap: { ...StyleSheet.absoluteFill, justifyContent: "flex-end" },
  sheet: { backgroundColor: c.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderBottomWidth: 0, borderColor: c.glassBorder, paddingHorizontal: space.lg, paddingTop: 10, gap: 12 },
  handle: { alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.22)", marginBottom: 6 },
  head: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  title: { color: c.ink, fontSize: 19, fontWeight: "800" },
  sub: { color: c.muted, fontSize: 13, marginTop: 2, maxWidth: 260 },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  btn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, height: 54, borderRadius: 16 },
  waze: { backgroundColor: "#33ccff" },
  google: { backgroundColor: "#1f6feb" },
  wazeText: { color: "#06192b", fontSize: 16, fontWeight: "800" },
  googleText: { color: c.white, fontSize: 16, fontWeight: "800" },
});
