import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.sm,
  },
  kicker: { color: c.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2, marginBottom: space.sm },
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 12 },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.glassBorder },
  rank: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: "hidden",
    textAlign: "center",
    lineHeight: 26,
    fontSize: 12,
    fontWeight: "800",
    color: c.muted,
    backgroundColor: c.glass,
  },
  rankFirst: { color: c.white, backgroundColor: c.primary },
  main: { flex: 1, gap: 8 },
  line: { flexDirection: "row", alignItems: "center", gap: space.md },
  name: { flex: 1, color: c.ink, fontSize: 15, fontWeight: "600" },
  // Nisbət zolağı: nazik, yuvarlaq; birinci yer vurğu rəngində, qalanları solğun
  track: { height: 4, borderRadius: 2, backgroundColor: c.glass, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 2, backgroundColor: "rgba(79, 141, 255, 0.45)" },
  fillFirst: { backgroundColor: c.primary },
  count: { color: c.ink, fontSize: 15, fontWeight: "800", fontVariant: ["tabular-nums"] },
});
