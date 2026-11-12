import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { width: 46, height: 46, alignItems: "center", justifyContent: "center", zIndex: 5 },
  btn: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: c.glass },
  hold: { backgroundColor: c.danger },
});
