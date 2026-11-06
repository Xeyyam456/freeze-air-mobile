import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { color: c.muted, fontSize: 13, fontWeight: "600" },
  box: {
    minHeight: 50,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.surface2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  focused: { borderColor: c.primary },
  input: { flex: 1, color: c.ink, fontSize: 16, paddingVertical: 12 },
  eye: { padding: 4 },
});
