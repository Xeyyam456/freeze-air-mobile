import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", zIndex: 5 },
  comment: { flexDirection: "row", alignItems: "center", gap: 8, paddingRight: 12, paddingLeft: 3, paddingVertical: 3, borderRadius: 14 },
  commentOn: { backgroundColor: c.primarySoft },
  tile: { width: 32, height: 32, borderRadius: 10, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  tileOff: { backgroundColor: c.surface2 },
  tileOn: { shadowColor: c.primary, shadowOpacity: 0.55, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  commentText: { color: c.muted, fontSize: 13, fontWeight: "800", fontVariant: ["tabular-nums"] },
  commentTextOn: { color: c.primary },
  right: { flexDirection: "row", alignItems: "center", gap: 6 },
  smile: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  smileOn: { backgroundColor: c.primarySoft },
  chip: { flexDirection: "row", alignItems: "center", gap: 5, height: 32, paddingHorizontal: 11, borderRadius: 16, borderWidth: 1, borderColor: c.glassBorder, backgroundColor: c.surface2 },
  chipMine: { borderColor: "rgba(79, 141, 255, 0.5)", backgroundColor: c.primarySoft },
  chipEmoji: { fontSize: 15 },
  chipCount: { color: c.muted, fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  popup: { position: "absolute", bottom: 46, right: 0, flexDirection: "row", gap: 2, padding: 6, borderRadius: radius.md, backgroundColor: c.surface2, borderWidth: 1, borderColor: c.glassBorder, shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 12 },
  pick: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  pickOn: { backgroundColor: c.primarySoft },
  pickEmoji: { fontSize: 27 },
  gradient: { position: "absolute" },
});
