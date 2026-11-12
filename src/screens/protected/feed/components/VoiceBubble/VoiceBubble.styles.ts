import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10, width: 232 },
  play: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: c.primary },
  playMine: { backgroundColor: c.white },
  mid: { flex: 1, gap: 4 },
  time: { color: c.muted, fontSize: 11, fontWeight: "700", fontVariant: ["tabular-nums"] },
  rate: { minWidth: 34, height: 24, paddingHorizontal: 6, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: c.surface2 },
  rateText: { color: c.ink, fontSize: 11, fontWeight: "800" },
});
