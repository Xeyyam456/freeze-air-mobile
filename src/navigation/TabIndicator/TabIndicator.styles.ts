import { StyleSheet } from "react-native";

// Ölçülər TabBar (paddingTop 10, paddingHorizontal 4) və TabBarItem (ikon sahəsi 58×36) ilə uyğun olmalıdır
export const styles = StyleSheet.create({
  track: { position: "absolute", left: 4, alignItems: "center" },
  pillTrack: { top: 10, height: 36 },
  pill: { width: 58, height: 36, borderRadius: 18 }, // rəng: aktiv tabın soft rəngi (TabIndicator)
  lineTrack: { top: 0, height: 8 },
  // Üst kənarda aktiv xətt (tabın rəngində)
  line: { position: "absolute", top: 0, width: 30, height: 2.5, borderBottomLeftRadius: 2, borderBottomRightRadius: 2 },
});
