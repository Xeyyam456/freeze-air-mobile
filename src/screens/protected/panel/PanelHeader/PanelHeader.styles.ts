import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md },
  text: { flex: 1 },
  hello: { color: c.ink, fontSize: 21, fontWeight: "800" },
  date: { color: c.muted, fontSize: 13, marginTop: 2 },
  logout: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.line,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
});
