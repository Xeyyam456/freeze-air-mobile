import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: space.lg, marginBottom: space.md },
  note: { color: c.muted, fontSize: 14 },
  section: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: space.sm },
  title: { color: c.ink, fontSize: 22, fontWeight: "800", letterSpacing: -0.3 },
  count: { color: c.muted, fontSize: 13, fontWeight: "600" },
});
