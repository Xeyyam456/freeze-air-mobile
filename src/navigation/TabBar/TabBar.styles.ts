import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 12,
    right: 12,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: c.glassBorder,
    backgroundColor: "rgba(15, 21, 36, 0.97)",
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
});
