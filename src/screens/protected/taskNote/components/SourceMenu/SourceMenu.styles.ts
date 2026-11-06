import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0, 0, 0, 0.55)" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: c.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: c.glassBorder,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    gap: 4,
  },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space.sm },
  title: { color: c.ink, fontSize: 16, fontWeight: "700" },
  close: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: c.glass },
  option: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 10, paddingHorizontal: 4, borderRadius: radius.sm },
  pressed: { backgroundColor: c.glass },
  iconTile: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  label: { color: c.ink, fontSize: 15, fontWeight: "600" },
});
