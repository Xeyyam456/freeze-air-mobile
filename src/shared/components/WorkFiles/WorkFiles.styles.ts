import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.65)" },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", paddingHorizontal: space.lg },
  card: { width: "100%", maxWidth: 400, maxHeight: "80%", backgroundColor: c.surface, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.lg, padding: space.lg, gap: space.md },
  head: { paddingRight: 40, gap: 2 },
  title: { color: c.ink, fontSize: 17, fontWeight: "800" },
  sub: { color: c.muted, fontSize: 13 },
  close: { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { width: "31.5%", aspectRatio: 1, borderRadius: 14, overflow: "hidden", backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  image: { width: "100%", height: "100%" },
  tile: { flex: 1, alignItems: "center", justifyContent: "center", gap: 6 },
  tileText: { color: c.primary, fontSize: 12, fontWeight: "800" },
  badge: { position: "absolute", left: 6, bottom: 6, color: c.white, backgroundColor: "rgba(0, 0, 0, 0.6)", fontSize: 10, fontWeight: "800", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, overflow: "hidden" },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
});
