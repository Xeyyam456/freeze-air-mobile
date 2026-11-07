import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  btn: { flexDirection: "row", alignItems: "center", gap: 12, height: 64, paddingLeft: 12, paddingRight: 16, borderRadius: 20, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  tile: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  text: { flex: 1, gap: 1 },
  kicker: { color: c.faint, fontSize: 10, fontWeight: "800", letterSpacing: 1.4 },
  name: { color: c.ink, fontSize: 16, fontWeight: "800" },
  count: { color: c.muted, fontSize: 12, fontWeight: "800", backgroundColor: "rgba(255, 255, 255, 0.07)", paddingHorizontal: 9, paddingVertical: 3, borderRadius: 10, overflow: "hidden", fontVariant: ["tabular-nums"] },
});
