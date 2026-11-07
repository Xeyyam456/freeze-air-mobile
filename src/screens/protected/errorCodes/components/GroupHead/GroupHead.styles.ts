import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 28, paddingBottom: 12 },
  tile: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  letter: { fontSize: 22, fontWeight: "800" },
  line: { flex: 1, height: 1 },
  count: { color: c.faint, fontSize: 12, fontWeight: "700" },
});
