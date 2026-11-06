import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  toast: { backgroundColor: c.surface2, borderLeftWidth: 5, borderRadius: 12, height: undefined, minHeight: 60, paddingVertical: 10 },
  content: { paddingHorizontal: 14 },
  title: { color: c.ink, fontSize: 15, fontWeight: "700" },
  detail: { color: c.muted, fontSize: 13 },
});
