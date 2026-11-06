import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.bg },
  content: { flexGrow: 1, paddingHorizontal: space.xl, gap: space.xl, justifyContent: "center" },
  brand: { alignItems: "center", gap: space.sm },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: c.primarySoft,
    borderWidth: 1,
    borderColor: "rgba(59, 140, 240, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: c.ink, fontSize: 28, fontWeight: "800", letterSpacing: 0.3 },
  badge: {
    color: c.primary,
    backgroundColor: c.primarySoft,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
  },
  card: { backgroundColor: c.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: c.line, padding: space.xl, gap: space.lg },
  title: { color: c.ink, fontSize: 20, fontWeight: "700" },
  error: { color: c.danger, fontSize: 14, fontWeight: "600" },
  submit: { marginTop: space.xs },
  hint: { color: c.muted, fontSize: 13, textAlign: "center" },
});
