import { StyleSheet } from "react-native";
import { c, layout, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  content: { paddingHorizontal: layout.gutter, paddingBottom: 110 },
  header: { gap: space.md, marginBottom: space.sm },
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    padding: space.md,
    gap: space.md,
  },
  hoursHead: { flexDirection: "row", alignItems: "center", gap: 7, paddingTop: space.sm, paddingHorizontal: 4 },
  hoursTitle: { color: c.ink, fontSize: 14, fontWeight: "700" },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", paddingVertical: space.lg },
  statusBar: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: c.bg },
});
