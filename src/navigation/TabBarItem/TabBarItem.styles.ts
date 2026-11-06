import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  item: { flex: 1, alignItems: "center", gap: 3 },
  iconWrap: { width: 52, height: 32, alignItems: "center", justifyContent: "center" },
  pill: { ...StyleSheet.absoluteFill, borderRadius: 16, backgroundColor: c.primarySoft },
  label: { color: c.muted, fontSize: 10.5, fontWeight: "600" },
  labelActive: { color: c.ink, fontWeight: "700" },
});
