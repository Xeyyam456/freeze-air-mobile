import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.6)" },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", paddingHorizontal: space.lg },
  card: { width: "100%", maxWidth: 400, alignItems: "center", backgroundColor: c.surface, borderWidth: 1, borderColor: c.glassBorder, borderRadius: radius.lg, padding: space.lg, paddingTop: space.xl, gap: space.md },
  close: { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  name: { color: c.ink, fontSize: 20, fontWeight: "800", textAlign: "center" },
  sub: { color: c.muted, fontSize: 14, textAlign: "center", marginTop: -6 },
  cells: { alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { flexGrow: 1, flexBasis: "46%", backgroundColor: c.glass, borderRadius: 14, padding: space.md, gap: 4 },
  cellHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  cellLabel: { color: c.muted, fontSize: 12, fontWeight: "600" },
  cellValue: { color: c.ink, fontSize: 15, fontWeight: "700" },
  plate: { alignSelf: "flex-start", color: c.ink, backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, overflow: "hidden", fontWeight: "800" },
  call: { alignSelf: "stretch" },
});
