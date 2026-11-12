import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 1, overflow: "hidden" },
  bar: { flex: 1, borderRadius: 1, minWidth: 1.5 }, // 48 sütun × 2,5 dp = 120 dp: oxut və sürət düymələri arasındakı yerə sığır
});
