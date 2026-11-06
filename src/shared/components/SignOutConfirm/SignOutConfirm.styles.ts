import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.6)" },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", paddingHorizontal: space.lg },
  card: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    paddingTop: space.xl,
    paddingHorizontal: space.lg,
    paddingBottom: space.lg,
    gap: space.md,
  },
  close: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.glass,
  },
  iconTile: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: c.dangerSoft },
  title: { color: c.ink, fontSize: 18, fontWeight: "800" },
  text: { color: c.muted, fontSize: 14, lineHeight: 20, textAlign: "center" },
  actions: { flexDirection: "row", gap: space.sm, alignSelf: "stretch", marginTop: space.sm },
  grow: { flex: 1 },
});
