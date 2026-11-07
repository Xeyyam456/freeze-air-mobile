import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  close: { position: "absolute", right: 16, width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.14)" },
  count: { position: "absolute", alignSelf: "center", color: c.ink, fontSize: 13, fontWeight: "700", backgroundColor: "rgba(0, 0, 0, 0.55)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, overflow: "hidden" },
});
