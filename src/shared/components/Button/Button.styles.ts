import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";
import type { ButtonVariant } from "./Button.types";

export const BG: Record<ButtonVariant, string> = {
  gradient: "transparent",
  glass: c.glass,
  primary: c.primary,
  ok: c.ok,
  navy: c.navy,
  soft: c.surface2,
};

export const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.md,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    overflow: "hidden",
  },
  glass: { borderWidth: 1, borderColor: c.glassBorder },
  disabled: { opacity: 0.55 },
  title: { color: c.white, fontSize: 16, fontWeight: "700", letterSpacing: 0.2 },
});
