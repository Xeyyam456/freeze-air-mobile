import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { gap: 0 },
  row: { flexDirection: "row", gap: 14 },
  rail: { alignItems: "center", width: 28 },
  dot: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft, borderWidth: 1, borderColor: "rgba(79, 141, 255, 0.4)" },
  dotText: { color: c.primary, fontSize: 12, fontWeight: "800" },
  line: { flex: 1, width: 2, marginVertical: 4, borderRadius: 1, backgroundColor: "rgba(79, 141, 255, 0.22)" },
  text: { flex: 1, color: c.ink, fontSize: 15, lineHeight: 23, paddingBottom: 18, paddingTop: 2 },
  textLast: { paddingBottom: 2 },
});
