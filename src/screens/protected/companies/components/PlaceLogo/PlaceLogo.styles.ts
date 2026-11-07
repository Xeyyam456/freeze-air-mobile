import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { alignItems: "center", justifyContent: "center", overflow: "hidden", shadowColor: c.primary, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 6 },
  letter: { color: c.white, fontWeight: "800" },
});
