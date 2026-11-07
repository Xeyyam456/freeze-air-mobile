import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: { backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.md, padding: space.md, gap: space.md },
  head: { flexDirection: "row", alignItems: "center", gap: space.md },
  who: { flex: 1, gap: 1 },
  name: { color: c.ink, fontSize: 15, fontWeight: "800" },
  when: { color: c.muted, fontSize: 12, fontWeight: "600" },
  place: { color: c.ink, fontSize: 17, fontWeight: "800" },
  company: { color: c.primary, fontSize: 12, fontWeight: "700", marginTop: -8 },
  desc: { color: c.ink, opacity: 0.85, fontSize: 14, lineHeight: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  cell: { width: "32.4%", aspectRatio: 1, borderRadius: 12, overflow: "hidden", backgroundColor: c.surface2, borderWidth: 1, borderColor: c.glassBorder },
  image: { width: "100%", height: "100%" },
  tile: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  tileText: { color: c.primary, fontSize: 11, fontWeight: "800" },
  more: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.55)" },
  moreText: { color: c.white, fontSize: 22, fontWeight: "800" },
  badge: { position: "absolute", left: 6, bottom: 6, color: c.white, backgroundColor: "rgba(0, 0, 0, 0.6)", fontSize: 10, fontWeight: "800", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, overflow: "hidden" },
});
