import { StyleSheet } from "react-native";
import type { DayStatus } from "@typings/attendance";
import { c } from "@theme/colors";

export const WEEK = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];

// Gün xanasının rəngi (web constants/calendar CELL)
export const CELL: Record<DayStatus, { backgroundColor: string; color: string; borderWidth?: number; borderColor?: string }> = {
  present: { backgroundColor: c.ok, color: c.white },
  leave: { backgroundColor: "#8b5cf6", color: c.white },
  absent: { backgroundColor: c.danger, color: c.white },
  pending: { backgroundColor: c.primarySoft, color: c.primary, borderWidth: 2, borderColor: c.primary },
  off: { backgroundColor: "rgba(148, 163, 184, 0.25)", color: "#e2e8f0" },
  future: { backgroundColor: "rgba(255, 255, 255, 0.07)", color: "rgba(244, 246, 251, 0.85)", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.06)" },
  before: { backgroundColor: "rgba(255, 255, 255, 0.04)", color: "rgba(244, 246, 251, 0.45)" },
};

export const LEGEND: { s: DayStatus; label: string }[] = [
  { s: "present", label: "İşdə" },
  { s: "leave", label: "İcazəli" },
  { s: "absent", label: "Gəlmədi" },
  { s: "off", label: "Bazar" },
];

export const styles = StyleSheet.create({
  wrap: { gap: 6 },
  week: { flexDirection: "row", gap: 6 },
  weekday: { flex: 1, textAlign: "center", color: "rgba(244, 246, 251, 0.7)", fontSize: 11, fontWeight: "700", paddingBottom: 2 },
  cell: { flex: 1, aspectRatio: 1, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  skeleton: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  num: { fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
  numSmall: { fontSize: 10, fontWeight: "700", lineHeight: 11 },
  legend: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, paddingHorizontal: 2 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 3 },
  legendText: { color: "rgba(244, 246, 251, 0.8)", fontSize: 12 },
});
