import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";
import type { ButtonVariant } from "./Button.types";

export const BG: Record<ButtonVariant, string> = { primary: c.primary, ok: c.ok, navy: c.navy, soft: c.surface2 };

export const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  disabled: { opacity: 0.55 },
  title: { color: c.white, fontSize: 15, fontWeight: "700" },
});
