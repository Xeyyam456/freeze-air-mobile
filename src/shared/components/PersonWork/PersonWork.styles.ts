import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", gap: space.sm },
  day: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: space.sm, paddingHorizontal: 4 },
  dayText: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.6, textTransform: "uppercase" },
  dayCount: { color: c.primary, fontSize: 11, fontWeight: "800", backgroundColor: c.primarySoft, paddingHorizontal: 8, paddingVertical: 1, borderRadius: 999, overflow: "hidden" },
  item: { flexDirection: "row", gap: space.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: 14, padding: space.md },
  pressed: { opacity: 0.8 },
  files: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: c.primarySoft, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  filesText: { color: c.primary, fontSize: 12, fontWeight: "800" },
  time: { color: c.primary, backgroundColor: c.primarySoft, alignSelf: "flex-start", fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"], paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, overflow: "hidden" },
  text: { flex: 1, gap: 2 },
  place: { color: c.ink, fontSize: 15, fontWeight: "800" },
  company: { color: c.muted, fontSize: 12, fontWeight: "600" },
  desc: { color: c.ink, opacity: 0.85, fontSize: 14, lineHeight: 20, marginTop: 2 },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.xl },
  summary: { color: c.muted, fontSize: 12, fontWeight: "600", textAlign: "center" },
});
