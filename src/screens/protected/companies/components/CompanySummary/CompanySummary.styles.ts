import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, overflow: "hidden", padding: 18, gap: 16, borderWidth: 1, borderColor: "rgba(34, 195, 230, 0.18)" },
  top: { flexDirection: "row", alignItems: "center", gap: 14 },
  tile: { width: 54, height: 54, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.1)" },
  kicker: { color: "rgba(255, 255, 255, 0.5)", fontSize: 11, fontWeight: "800", letterSpacing: 1.3 },
  count: { color: c.white, fontSize: 24, fontWeight: "800" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { width: "48.5%", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, backgroundColor: "rgba(255, 255, 255, 0.07)" },
  label: { color: "rgba(255, 255, 255, 0.55)", fontSize: 12 },
  value: { color: c.white, fontSize: 24, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
