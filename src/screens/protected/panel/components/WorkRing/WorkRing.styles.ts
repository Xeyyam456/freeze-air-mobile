import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  // Halqa saat 12-dən başlasın
  svg: { transform: [{ rotate: "-90deg" }] },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center" },
  time: { color: c.ink, fontSize: 34, fontWeight: "800", fontVariant: ["tabular-nums"], letterSpacing: -0.5 },
  of: { color: c.muted, fontSize: 12, fontWeight: "600", marginTop: -2 },
});
