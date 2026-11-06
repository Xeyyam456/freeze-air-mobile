import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingTop: space.xs },
  text: { flex: 1 },
  date: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  hello: { color: c.ink, fontSize: 28, fontWeight: "800", letterSpacing: -0.4, marginTop: 2 },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: { padding: 2, borderRadius: 25, borderWidth: 1.5, borderColor: c.primary },
  pressed: { opacity: 0.6 },
});
