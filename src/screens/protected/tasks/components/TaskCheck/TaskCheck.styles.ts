import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: c.faint,
    alignItems: "center",
    justifyContent: "center",
  },
  done: { backgroundColor: c.ok, borderColor: c.ok },
  disabled: { opacity: 0.45 },
  pressed: { transform: [{ scale: 0.9 }] },
});
