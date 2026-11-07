import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.7)" },
  wrap: { ...StyleSheet.absoluteFill, justifyContent: "flex-end" },
  sheet: { backgroundColor: c.surface, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderWidth: 1, borderBottomWidth: 0, borderColor: c.glassBorder, overflow: "hidden" },
  banner: { alignItems: "center", paddingTop: 30, paddingBottom: 14 },
  glow: { position: "absolute", top: 0 },
  handle: { position: "absolute", top: 8, alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.22)" },
  close: { position: "absolute", top: 16, right: 16, width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.08)" },
  model: { color: c.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.6 },
  code: { color: c.ink, fontSize: 92, lineHeight: 104, fontWeight: "800", letterSpacing: 6, fontVariant: ["tabular-nums"] },
  body: { paddingHorizontal: space.lg + 4, paddingTop: 4, paddingBottom: space.lg, gap: 22 },
  title: { color: c.ink, fontSize: 21, fontWeight: "800", lineHeight: 28, textAlign: "center" },
  muted: { color: c.muted },
  head: { color: c.faint, fontSize: 11, fontWeight: "800", letterSpacing: 1.6, marginBottom: 12 },
  empty: { color: c.muted, fontSize: 14, lineHeight: 21 },
  twin: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, marginBottom: 8 },
  twinModel: { color: c.ink, fontSize: 13, fontWeight: "800" },
  twinText: { flex: 1, color: c.muted, fontSize: 13 },
  steps: { flexDirection: "row", gap: space.sm },
  step: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, height: 50, borderRadius: radius.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  stepOff: { opacity: 0.3 },
  stepText: { color: c.ink, fontSize: 15, fontWeight: "800" },
});
