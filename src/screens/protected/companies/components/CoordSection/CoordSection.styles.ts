import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { gap: 10, paddingTop: 18, borderTopWidth: 1, borderTopColor: c.line },
  label: { color: c.faint, fontSize: 11, fontWeight: "800", letterSpacing: 1.3 },
  now: { color: c.muted, fontSize: 13, lineHeight: 19 },
  bold: { color: c.ink, fontWeight: "800", fontVariant: ["tabular-nums"] },
  hint: { color: c.faint, fontSize: 12, lineHeight: 17 },
  find: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 46, borderRadius: 14, backgroundColor: c.primarySoft, borderWidth: 1, borderColor: "rgba(79, 141, 255, 0.4)" },
  findText: { color: c.primary, fontSize: 14, fontWeight: "800" },
  input: { height: 46, color: c.ink, fontSize: 15, paddingHorizontal: 14, borderRadius: 14, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, fontVariant: ["tabular-nums"] },
  bad: { borderColor: c.danger },
  badText: { color: c.danger, fontSize: 12, fontWeight: "700" },
  info: { gap: 4 },
  infoLine: { color: c.ink, fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
  good: { color: c.ok, fontSize: 12, fontWeight: "700" },
  warn: { color: c.danger, fontSize: 12, fontWeight: "700" },
  dist: { color: c.muted, fontSize: 12 },
  write: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 48, borderRadius: 14, backgroundColor: c.primary },
  writeText: { color: c.white, fontSize: 15, fontWeight: "800" },
  off: { opacity: 0.4 },
});
