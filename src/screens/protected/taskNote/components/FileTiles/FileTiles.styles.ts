import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8 },
  tile: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: c.glassBorder,
    backgroundColor: c.glass,
  },
  on: { borderStyle: "solid", borderColor: c.primary, backgroundColor: c.primarySoft },
  pressed: { opacity: 0.7 },
  title: { color: c.ink, fontSize: 14, fontWeight: "700" },
  hint: { color: c.muted, fontSize: 11, textAlign: "center", alignSelf: "stretch" },
});
