import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md },
  back: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  text: { flex: 1 },
  title: { color: c.ink, fontSize: 24, fontWeight: "800", letterSpacing: -0.3 },
  sub: { color: c.muted, fontSize: 13, fontWeight: "500", marginTop: 1 },
});
