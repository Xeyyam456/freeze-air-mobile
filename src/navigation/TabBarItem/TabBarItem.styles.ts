import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  item: { flex: 1, alignItems: "center", gap: 4 },
  iconWrap: { width: 58, height: 36, alignItems: "center", justifyContent: "center" },
  pill: { ...StyleSheet.absoluteFill, borderRadius: 18, backgroundColor: c.primarySoft },
  // Rəqəm nişanı: ikonun sağ yuxarı küncü, tab bar fonu rəngində halqa (kəsik effekti)
  badge: {
    position: "absolute",
    top: -6,
    right: 2,
    minWidth: 23,
    height: 23,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: c.danger,
    borderWidth: 2.5,
    borderColor: c.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: c.white, fontSize: 12.5, fontWeight: "800", fontVariant: ["tabular-nums"], lineHeight: 15 },
  label: { color: c.muted, fontSize: 12, fontWeight: "600" },
  labelActive: { color: c.ink, fontWeight: "700" },
});
