import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: c.glassBorder },
  empty: { height: 180, alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: c.glass },
  emptyText: { color: c.muted, fontSize: 14 },
});
