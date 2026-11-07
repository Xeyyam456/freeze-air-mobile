import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.65)" },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", paddingHorizontal: space.lg },
  card: { width: "100%", maxWidth: 400, backgroundColor: c.surface, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.lg, overflow: "hidden" },
  banner: { height: 92 },
  close: { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.35)" },
  head: { alignItems: "center", paddingHorizontal: space.lg, paddingBottom: space.md, gap: space.sm },
  ring: { marginTop: -50, padding: 3, borderWidth: 3, borderRadius: 999, backgroundColor: c.surface },
  name: { color: c.ink, fontSize: 21, fontWeight: "800", textAlign: "center", marginTop: 4 },
  chip: { color: c.primary, backgroundColor: c.primarySoft, fontSize: 12, fontWeight: "700", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, overflow: "hidden" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  status: { fontSize: 13, fontWeight: "700" },
  partner: { color: c.primary, fontSize: 13, fontWeight: "700", textAlign: "center", minHeight: 36 }, // 2 sətir yeri sabit: pəncərə ölçüsü dəyişməsin
  tabs: { alignSelf: "stretch", flexDirection: "row", gap: 6, marginTop: space.sm },
  tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 9, borderRadius: 12, backgroundColor: c.glass, borderWidth: 1, borderColor: c.glassBorder },
  tabOn: { backgroundColor: c.primarySoft, borderColor: "rgba(79, 141, 255, 0.5)" },
  tabText: { color: c.muted, fontSize: 13, fontWeight: "700" },
  tabTextOn: { color: c.ink },
  count: { color: c.muted, fontSize: 11, fontWeight: "800", backgroundColor: c.surface2, paddingHorizontal: 7, paddingVertical: 1, borderRadius: 999, overflow: "hidden" },
  countOn: { color: c.white, backgroundColor: c.primary },
  content: { paddingHorizontal: space.lg, paddingBottom: 28 }, // iş siyahısının altı: son kart pəncərənin kənarına yapışmasın (pəncərənin ölçüsünə təsir etmir)
  contentAbout: { paddingBottom: space.lg },
  measure: { position: "absolute", top: 0, left: space.lg, right: space.lg, opacity: 0 },
});
