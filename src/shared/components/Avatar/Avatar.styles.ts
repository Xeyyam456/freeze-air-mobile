import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  ring: { borderWidth: 1, borderColor: c.line },
  fallback: { backgroundColor: c.navy, alignItems: "center", justifyContent: "center" },
  text: { color: c.ink, fontWeight: "700" },
});
