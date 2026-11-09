import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.65)" },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", paddingHorizontal: space.lg },
  card: { width: "100%", maxWidth: 400, maxHeight: "70%", backgroundColor: c.surface, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.lg, padding: space.lg, gap: space.md },
  title: { color: c.ink, fontSize: 17, fontWeight: "800", paddingRight: 40 },
  head: { flexDirection: "row", alignItems: "center", gap: space.sm, paddingTop: space.sm },
  emoji: { fontSize: 20 },
  count: { color: c.muted, fontSize: 14, fontWeight: "800" },
  close: { position: "absolute", zIndex: 10, elevation: 10, top: 12, right: 12, width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  row: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 8 },
  line: { borderTopWidth: 1, borderTopColor: c.line },
  text: { flex: 1, gap: 1 },
  name: { color: c.ink, fontSize: 15, fontWeight: "700" },
  role: { color: c.muted, fontSize: 12 },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
});
