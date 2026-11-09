import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: space.lg, paddingBottom: 10 },
  list: { paddingHorizontal: space.lg },
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: c.line },
  tile: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.05)" },
  text: { flex: 1, gap: 2 },
  name: { color: c.ink, fontSize: 15, fontWeight: "700" },
  meta: { color: c.muted, fontSize: 12 },
  qty: { color: c.primary, fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"], maxWidth: 120, textAlign: "right" },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.xl },
});
