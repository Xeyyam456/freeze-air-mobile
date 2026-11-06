import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.lg,
    padding: space.sm,
    gap: space.xs,
  },
  top: { flexDirection: "row", alignItems: "center", gap: space.sm, paddingHorizontal: space.xs },
  arrow: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  range: { flex: 1, color: c.ink, fontSize: 14, fontWeight: "700", textAlign: "center" },
  today: { color: c.primary, fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.6 },
  days: { flexDirection: "row", gap: 2 },
});
