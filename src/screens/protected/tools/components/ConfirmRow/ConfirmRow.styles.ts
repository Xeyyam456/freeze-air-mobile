import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { backgroundColor: c.orangeSoft, borderWidth: 1, borderColor: "rgba(251, 191, 36, 0.35)", borderRadius: radius.md, padding: space.md, gap: space.md },
  top: { flexDirection: "row", alignItems: "center", gap: space.md },
  tile: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  text: { flex: 1, gap: 2 },
  name: { color: c.ink, fontSize: 15, fontWeight: "700" },
  meta: { color: c.muted, fontSize: 12 },
  actions: { flexDirection: "row", gap: 8 },
  btn: { flex: 1, height: 40, borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  yes: { backgroundColor: c.primary },
  yesText: { color: c.white, fontSize: 14, fontWeight: "800" },
  no: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  noText: { color: c.ink, fontSize: 14, fontWeight: "700" },
});
