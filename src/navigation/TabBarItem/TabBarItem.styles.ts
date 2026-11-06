import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  item: { flex: 1, alignItems: "center", gap: 3 },
  iconWrap: { width: 52, height: 32, alignItems: "center", justifyContent: "center" },
  pill: { ...StyleSheet.absoluteFill, borderRadius: 16, backgroundColor: c.primarySoft },
  // Rəqəm nişanı: ikonun sağ yuxarı küncü, tab bar fonu rəngində halqa (kəsik effekti)
  badge: {
    position: "absolute",
    top: -3,
    right: 6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: c.danger,
    borderWidth: 2,
    borderColor: c.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: c.white, fontSize: 10, fontWeight: "800", fontVariant: ["tabular-nums"], lineHeight: 12 },
  label: { color: c.muted, fontSize: 10.5, fontWeight: "600" },
  labelActive: { color: c.ink, fontWeight: "700" },
});
