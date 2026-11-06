import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    marginBottom: 6,
    paddingVertical: space.md,
    paddingRight: space.md,
    borderRadius: radius.md,
    backgroundColor: c.dangerSoft,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.3)",
    overflow: "hidden",
  },
  bar: { width: 4, alignSelf: "stretch", backgroundColor: c.danger },
  text: { flex: 1, gap: 2 },
  day: { color: c.ink, fontSize: 15, fontWeight: "800" },
  weekday: { color: c.muted, fontSize: 13, fontWeight: "600" },
  km: { color: c.muted, fontSize: 12 },
  right: { alignItems: "flex-end" },
  due: { color: c.danger, fontSize: 17, fontWeight: "800", fontVariant: ["tabular-nums"] },
  label: { color: c.danger, fontSize: 11, fontWeight: "700" },
});
