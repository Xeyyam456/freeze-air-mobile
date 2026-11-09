import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { dayLabel } from "@shared/utils/helpers/time";
import { styles } from "./TasksHeader.styles";
import type { TasksHeaderProps } from "./TasksHeader.types";

// Başlıq: kiçik tarix sətri, iri "Tapşırıqlar", sağda "2/3 görülüb"; altında nazik irəliləyiş xətti (UI thread animasiya)
function TasksHeader({ day, summary }: TasksHeaderProps) {
  const p = useSharedValue(0);
  const ratio = summary.total ? summary.done / summary.total : 0;
  useEffect(() => {
    p.value = withTiming(ratio, { duration: 500, easing: Easing.out(Easing.cubic) });
  }, [ratio, p]);
  const bar = useAnimatedStyle(() => ({ width: `${p.value * 100}%` }));
  const all = summary.total > 0 && summary.done === summary.total;

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.date}>{dayLabel(day).toUpperCase()}</Text>
          <Text style={styles.title}>Tapşırıqlar</Text>
        </View>
        <View style={styles.score}>
          <Text style={[styles.value, all && styles.ok]}>{summary.done}/{summary.total}</Text>
          <Text style={styles.label}>{summary.total === 0 ? "tapşırıq yoxdur" : all ? "hamısı görülüb" : "görülüb"}</Text>
        </View>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, all && styles.fillOk, bar]} />
      </View>
    </View>
  );
}

export default TasksHeader;
