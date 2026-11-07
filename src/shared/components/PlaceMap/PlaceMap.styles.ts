import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  box: { overflow: "hidden", borderRadius: 18, backgroundColor: c.surface2 },
  pin: { alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 17, backgroundColor: c.primary, borderWidth: 3, borderColor: c.white },
  me: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#2f80ff", borderWidth: 3, borderColor: c.white },
  tools: { position: "absolute", right: 10, bottom: 28, gap: 8 },
  tool: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 5 },
  toolOff: { opacity: 0.5 },
});
