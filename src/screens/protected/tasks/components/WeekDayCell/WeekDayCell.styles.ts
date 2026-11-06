import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  cell: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selected: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.35)" },
  pressed: { opacity: 0.6 },
  wd: { color: c.faint, fontSize: 11, fontWeight: "700" },
  num: { color: c.ink, fontSize: 17, fontWeight: "800", fontVariant: ["tabular-nums"] },
  today: { color: c.primary },
  on: { color: c.white },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "transparent" },
  dotMine: { backgroundColor: c.primary },
  dotTeam: { backgroundColor: c.faint },
});
