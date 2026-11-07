import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  // Ikonun sağ yuxarı küncü (rəqəm nişanı ilə eyni yer)
  wrap: { position: "absolute", top: -2, right: 8, width: 14, height: 14, alignItems: "center", justifyContent: "center" },
  ring: { position: "absolute", width: 14, height: 14, borderRadius: 7, backgroundColor: c.danger },
  // Tab bar fonu rəngində halqa (kəsik effekti)
  border: { width: 14, height: 14, borderRadius: 7, borderWidth: 2.5, borderColor: c.surface, backgroundColor: c.surface, alignItems: "center", justifyContent: "center" },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: c.danger },
});
