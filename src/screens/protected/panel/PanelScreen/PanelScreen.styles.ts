import { StyleSheet } from "react-native";
import { c, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  content: { paddingHorizontal: space.lg },
  header: { gap: space.lg, marginBottom: space.md },
  note: { color: c.muted, fontSize: 14 },
  section: { flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: space.sm },
  sectionTitle: { color: c.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" },
  count: {
    marginLeft: "auto",
    color: c.ink,
    backgroundColor: c.surface2,
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  gap: { height: space.sm },
  loader: { marginTop: space.xl },
  empty: { color: c.muted, fontSize: 14, textAlign: "center", marginTop: space.xl },
});
