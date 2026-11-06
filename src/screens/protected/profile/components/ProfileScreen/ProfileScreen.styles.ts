import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  content: { paddingHorizontal: layout.gutter, paddingBottom: 120, gap: space.lg },
  card: {
    alignItems: "center",
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    paddingVertical: space.xl,
    paddingHorizontal: space.lg,
    gap: space.lg,
  },
  photoWrap: { alignItems: "center", justifyContent: "center" },
  ring: { padding: 4, borderRadius: 999, borderWidth: 2, borderColor: c.primary },
  badge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.primary,
    borderWidth: 3,
    borderColor: c.bg,
  },
  who: { alignItems: "center", gap: 4 },
  name: { color: c.ink, fontSize: 22, fontWeight: "800", textAlign: "center" },
  position: { color: c.muted, fontSize: 14, fontWeight: "600" },
  actions: { flexDirection: "row", gap: space.sm, alignSelf: "stretch" },
  grow: { flex: 1 },
  hint: { color: c.muted, fontSize: 12, textAlign: "center", lineHeight: 17 },
});
