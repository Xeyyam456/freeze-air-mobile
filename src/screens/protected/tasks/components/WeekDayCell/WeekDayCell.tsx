import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { weekdayShort } from "@shared/utils/helpers/time";
import { styles } from "./WeekDayCell.styles";
import type { WeekDayCellProps } from "./WeekDayCell.types";

// Həftənin bir günü: qısa ad, tarix, altında nöqtə (mavi = mənim tapşırığım var, solğun = yalnız başqalarının)
function WeekDayCell({ d, selected, isToday, onPress }: WeekDayCellProps) {
  return (
    <Pressable onPress={() => onPress(d.day)} style={({ pressed }) => [styles.cell, selected && styles.selected, pressed && styles.pressed]}>
      <Text style={[styles.wd, selected && styles.on]}>{weekdayShort(d.day)}</Text>
      <Text style={[styles.num, isToday && styles.today, selected && styles.on]}>{+d.day.slice(8)}</Text>
      <View style={[styles.dot, d.mine > 0 ? styles.dotMine : d.total > 0 ? styles.dotTeam : null]} />
    </Pressable>
  );
}

export default memo(WeekDayCell);
