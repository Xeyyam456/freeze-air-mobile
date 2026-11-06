import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg, paddingHorizontal: space.lg },
  title: { color: c.ink, fontSize: 24, fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: space.md, paddingBottom: 110 },
  tile: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: c.primarySoft,
    borderWidth: 1,
    borderColor: "rgba(59, 140, 240, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  soon: { color: c.ink, fontSize: 18, fontWeight: "700" },
  text: { color: c.muted, fontSize: 14, textAlign: "center", maxWidth: 280, lineHeight: 20, borderRadius: radius.sm },
});
