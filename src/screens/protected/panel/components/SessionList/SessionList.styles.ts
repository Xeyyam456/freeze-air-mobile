import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  list: { backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: radius.md },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 10 },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.glassBorder },
  num: {
    width: 22,
    height: 22,
    borderRadius: 11,
    overflow: "hidden",
    textAlign: "center",
    lineHeight: 22,
    fontSize: 11,
    fontWeight: "800",
    color: c.muted,
    backgroundColor: c.glass,
  },
  numLive: { color: c.white, backgroundColor: c.ok },
  time: { color: c.ink, fontSize: 14, fontWeight: "600", fontVariant: ["tabular-nums"] },
  dur: { marginLeft: "auto", color: c.muted, fontSize: 12, fontWeight: "600" },
  durLive: { color: c.ok },
});
