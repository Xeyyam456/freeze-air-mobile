import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md, gap: space.sm, marginBottom: space.sm },
  top: { flexDirection: "row", alignItems: "center", gap: space.sm },
  text: { flex: 1, gap: 2 },
  amount: { color: c.ink, fontSize: 17, fontWeight: "800", fontVariant: ["tabular-nums"] },
  day: { color: c.muted, fontSize: 13, fontWeight: "600" },
  note: { color: c.muted, fontSize: 13 },
  badge: { fontSize: 12, fontWeight: "800", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: "hidden" },
  ok: { color: c.ok, backgroundColor: c.okSoft },
  bad: { color: c.danger, backgroundColor: c.dangerSoft },
  actions: { flexDirection: "row", gap: space.sm },
  btn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12 },
  btnOk: { backgroundColor: c.ok },
  btnOkText: { color: c.white, fontSize: 14, fontWeight: "800" },
  btnNo: { backgroundColor: c.dangerSoft },
  btnNoText: { color: c.danger, fontSize: 14, fontWeight: "800" },
});
