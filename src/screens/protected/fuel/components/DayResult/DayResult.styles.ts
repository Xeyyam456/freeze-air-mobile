import { StyleSheet } from "react-native";
import { radius, space } from "@theme/colors";

// Yaşıl qradiyent (web DayResult)
export const GREEN = ["#15803d", "#16a34a", "#22c55e"] as const;

export const styles = StyleSheet.create({
  card: { borderRadius: radius.md, padding: space.lg, gap: space.sm, overflow: "hidden" },
  head: { flexDirection: "row", alignItems: "center", gap: 8 },
  check: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.22)" },
  kicker: { color: "rgba(255, 255, 255, 0.85)", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  row: { flexDirection: "row" },
  half: { flex: 1, gap: 2 },
  divider: { borderLeftWidth: 1, borderLeftColor: "rgba(255, 255, 255, 0.22)", paddingLeft: space.lg },
  label: { color: "rgba(255, 255, 255, 0.68)", fontSize: 11, fontWeight: "700", letterSpacing: 0.8 },
  big: { color: "#ffffff", fontSize: 26, fontWeight: "800", fontVariant: ["tabular-nums"] },
  unit: { color: "rgba(255, 255, 255, 0.75)", fontSize: 14, fontWeight: "700" },
  foot: { color: "rgba(255, 255, 255, 0.9)", fontSize: 12, fontWeight: "600", fontVariant: ["tabular-nums"] },
});
