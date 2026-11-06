import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { backgroundColor: c.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: c.line, padding: space.lg, gap: space.md },
  head: { flexDirection: "row", alignItems: "center", gap: space.md },
  tile: { width: 36, height: 36, borderRadius: radius.sm, backgroundColor: c.primarySoft, alignItems: "center", justifyContent: "center" },
  title: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" },
  right: { marginLeft: "auto" },
});
