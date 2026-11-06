import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: space.sm,
    backgroundColor: c.glass,
    borderWidth: 1,
    borderColor: c.glassBorder,
    borderRadius: radius.md,
    paddingVertical: space.xl + 8,
    paddingHorizontal: space.lg,
  },
  icon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft },
  title: { color: c.ink, fontSize: 16, fontWeight: "700" },
  text: { color: c.muted, fontSize: 13, textAlign: "center", lineHeight: 19 },
});
