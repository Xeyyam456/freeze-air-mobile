import { StyleSheet } from "react-native";
import type { PresenceTone } from "@shared/utils/helpers/presence";
import { c, radius, space } from "@theme/colors";

// Vəziyyət çipinin rəngi
export const TONE: Record<PresenceTone, { fg: string; bg: string }> = {
  idle: { fg: c.muted, bg: c.glass },
  working: { fg: c.ok, bg: c.okSoft },
  done: { fg: c.primary, bg: c.primarySoft },
  leave: { fg: c.violet, bg: c.violetSoft },
  absent: { fg: c.danger, bg: c.dangerSoft },
  sunday: { fg: c.muted, bg: c.glass },
};

export const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: c.glassBorder,
    padding: space.lg + 2,
    overflow: "hidden",
    minHeight: 200,
  },
  loader: { marginTop: 80 },
  // Davamiyyət keçidi: sağ üst künc, şüşəvari dairə
  corner: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  cornerPressed: { opacity: 0.6 },
  body: { gap: space.lg },
  row: { flexDirection: "row", alignItems: "center", gap: space.lg + 2 },
  info: { flex: 1, gap: 8 },
  chip: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  chipText: { fontSize: 13, fontWeight: "700" },
  sub: { color: c.ink, fontSize: 20, fontWeight: "700", fontVariant: ["tabular-nums"] },
  meta: { color: c.muted, fontSize: 13, fontWeight: "600" },
});
