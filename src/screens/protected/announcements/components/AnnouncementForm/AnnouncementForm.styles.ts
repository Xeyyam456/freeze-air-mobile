import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    padding: space.md,
    gap: space.sm,
  },
  head: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" },
  input: {
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.surface2,
    color: c.ink,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  body: { minHeight: 80 },
  footer: { flexDirection: "row", alignItems: "center", gap: space.md },
  hint: { flex: 1, color: c.muted, fontSize: 12 },
  button: { minHeight: 44, paddingHorizontal: 16 },
});
