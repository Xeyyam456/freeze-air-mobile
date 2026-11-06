import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  counts: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  count: { flexDirection: "row", alignItems: "center", gap: 4 },
  countText: { color: c.muted, fontSize: 12, fontWeight: "600" },
  // Vəziyyət nişanı ilə eyni sətir və eyni hündürlük (TaskState chip: 12 px yazı, 4 px şaquli boşluq)
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: c.primarySoft,
  },
  pressed: { opacity: 0.7 },
  buttonText: { color: c.primary, fontSize: 12, fontWeight: "700" },
});
