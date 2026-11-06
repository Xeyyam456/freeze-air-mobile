import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    maxWidth: "100%",
  },
  text: { fontSize: 12, fontWeight: "700", flexShrink: 1 },
});
