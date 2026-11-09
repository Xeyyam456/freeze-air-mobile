import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingHorizontal: space.md + 2, paddingVertical: space.md },
  divider: { borderTopWidth: 1, borderTopColor: c.line },
  pressed: { backgroundColor: c.glass },
  // Plitə: ikonun rəngində nazik çərçivə; fon rəngi "glow" qatıdır (dalğada parlaqlaşır)
  tile: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  glow: { ...StyleSheet.absoluteFill },
  text: { flex: 1, gap: 2 },
  label: { color: c.ink, fontSize: 15, fontWeight: "700" },
  hint: { color: c.muted, fontSize: 12 },
});
