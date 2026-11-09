import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: space.md, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md },
  tile: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: "#7c3aed" },
  text: { flex: 1, gap: 2 },
  title: { color: c.ink, fontSize: 16, fontWeight: "800" },
  sub: { color: c.muted, fontSize: 12 },
});
