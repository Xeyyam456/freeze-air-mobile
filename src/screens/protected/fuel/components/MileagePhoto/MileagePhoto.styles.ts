import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: {
    width: 72,
    height: 54,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.surface2,
    borderWidth: 1,
    borderColor: c.glassBorder,
  },
  img: { width: "100%", height: "100%" },
});
