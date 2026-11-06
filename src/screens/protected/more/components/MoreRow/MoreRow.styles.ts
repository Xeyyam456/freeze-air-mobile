import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingHorizontal: space.md + 2, paddingVertical: space.md },
  divider: { borderTopWidth: 1, borderTopColor: c.line },
  pressed: { backgroundColor: c.glass },
  tile: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  text: { flex: 1, gap: 2 },
  label: { color: c.ink, fontSize: 15, fontWeight: "700" },
  hint: { color: c.muted, fontSize: 12 },
});
