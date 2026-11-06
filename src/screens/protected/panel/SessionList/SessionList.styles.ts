import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  list: { borderWidth: 1, borderColor: c.line, borderRadius: radius.md },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 12, paddingVertical: 10 },
  divider: { borderTopWidth: 1, borderTopColor: c.line },
  num: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
    textAlign: "center",
    lineHeight: 24,
    fontSize: 12,
    fontWeight: "700",
    color: c.muted,
    backgroundColor: c.surface2,
  },
  numLive: { color: c.white, backgroundColor: c.ok },
  time: { color: c.ink, fontSize: 14, fontWeight: "600", fontVariant: ["tabular-nums"] },
  dur: { marginLeft: "auto", color: c.muted, fontSize: 12, fontWeight: "600" },
  durLive: { color: c.ok },
});
