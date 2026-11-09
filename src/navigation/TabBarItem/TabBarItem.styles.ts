import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  item: { flex: 1, alignItems: "center", gap: 4 },
  // 58×36: TabIndicator həbi ilə eyni ölçü
  iconWrap: { width: 58, height: 36, alignItems: "center", justifyContent: "center" },
  // Rəqəm nişanı: ikonun sağ yuxarı küncü, tab bar fonu rəngində nazik halqa (kəsik effekti); ikondan çox diqqət çəkməsin
  badge: {
    position: "absolute",
    top: -3,
    right: 6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: c.danger,
    borderWidth: 2,
    borderColor: c.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: c.white, fontSize: 10.5, fontWeight: "800", fontVariant: ["tabular-nums"], lineHeight: 13 },
  label: { color: c.muted, fontSize: 11.5, fontWeight: "600", letterSpacing: 0.1 },
  labelActive: { color: c.primary, fontWeight: "800" },
});
