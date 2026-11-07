import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { borderTopWidth: 1, borderTopColor: c.line, backgroundColor: c.surface },
  row: { flexDirection: "row", alignItems: "flex-end", gap: space.sm, paddingHorizontal: space.md, paddingTop: space.sm, paddingBottom: 10 },
  smile: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  smileOn: { backgroundColor: c.primarySoft },
  input: { flex: 1, minHeight: 46, maxHeight: 110, color: c.ink, fontSize: 15, paddingHorizontal: 18, paddingVertical: 12, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: 23 },
  send: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  sendOff: { backgroundColor: c.surface2 },
});
