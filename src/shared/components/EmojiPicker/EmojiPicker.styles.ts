import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { borderTopWidth: 1, borderTopColor: c.line },
  tabs: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 8, paddingVertical: 6 },
  tab: { width: 44, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  tabOn: { backgroundColor: c.primarySoft },
  tabEmoji: { fontSize: 20 },
  cell: { flex: 1, height: 44, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
});
