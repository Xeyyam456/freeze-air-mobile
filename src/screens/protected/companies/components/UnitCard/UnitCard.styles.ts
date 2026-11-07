import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { gap: 12, padding: 16, borderRadius: 18, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderTopColor: "rgba(255, 255, 255, 0.12)" },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  code: { paddingHorizontal: 12, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  codeText: { color: c.primary, fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
  status: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: "700" },
  name: { color: c.ink, fontSize: 15, fontWeight: "800", lineHeight: 20 },
  line: { flexDirection: "row", alignItems: "flex-start", gap: 7 },
  lineText: { flex: 1, color: c.muted, fontSize: 13, lineHeight: 18 },
  link: { color: "#22c3e6", fontWeight: "700" },
  foot: { flexDirection: "row", gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: c.line },
  btn: { flex: 1, paddingHorizontal: 4 },
  nav: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 42, borderRadius: 13, backgroundColor: c.primarySoft },
  navOff: { opacity: 0.4 },
  navText: { color: c.primary, fontSize: 12, fontWeight: "800" },
});
