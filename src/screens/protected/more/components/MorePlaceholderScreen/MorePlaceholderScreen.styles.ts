import { StyleSheet } from "react-native";
import { c, layout, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg, paddingHorizontal: layout.gutter },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: space.sm, paddingBottom: 120 },
  tile: { width: 72, height: 72, borderRadius: 22, alignItems: "center", justifyContent: "center", marginBottom: space.sm },
  soon: { color: c.ink, fontSize: 20, fontWeight: "800" },
  text: { color: c.muted, fontSize: 14, textAlign: "center", lineHeight: 20, paddingHorizontal: space.xl },
});
