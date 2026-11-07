import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: space.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md },
  pressed: { opacity: 0.8 },
  tile: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  text: { flex: 1, gap: 4 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.sm },
  name: { flexShrink: 1, color: c.ink, fontSize: 17, fontWeight: "800" },
  when: { color: c.muted, fontSize: 12, fontWeight: "600" },
  bottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.sm },
  preview: { flex: 1, color: c.muted, fontSize: 14 },
  count: { minWidth: 22, textAlign: "center", color: c.white, backgroundColor: c.danger, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"], paddingHorizontal: 7, paddingVertical: 1, borderRadius: 999, overflow: "hidden" },
});
