import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 14 },
  rail: { alignItems: "center", width: 14 },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 6, backgroundColor: c.primary },
  line: { flex: 1, width: 2, marginTop: 4, borderRadius: 1, backgroundColor: "rgba(79, 141, 255, 0.2)" },
  body: { flex: 1, paddingBottom: 18, gap: 3 },
  when: { color: c.faint, fontSize: 12, fontWeight: "700" },
  desc: { color: c.ink, fontSize: 14, lineHeight: 20 },
  who: { color: c.primary, fontSize: 12, fontWeight: "700" },
  unit: { color: c.muted, fontSize: 12 },
});
