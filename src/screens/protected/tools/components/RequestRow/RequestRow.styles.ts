import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md },
  sending: { opacity: 0.6 },
  text: { flex: 1, gap: 2 },
  kind: { color: c.faint, fontSize: 10, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" },
  name: { color: c.ink, fontSize: 14, fontWeight: "700" },
  line: { color: c.muted, fontWeight: "500" },
  meta: { color: c.muted, fontSize: 11 },
  side: { alignItems: "flex-end", gap: 8 },
  status: { fontSize: 11, fontWeight: "800", paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999, overflow: "hidden" },
  x: { width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: c.dangerSoft },
});
