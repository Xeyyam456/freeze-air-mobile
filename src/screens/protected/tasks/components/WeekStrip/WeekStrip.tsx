import { Pressable, Text, View } from "react-native";
import { ChevronLeftIcon, ChevronRightIcon } from "@shared/icons";
import { weekRange } from "@shared/utils/helpers/time";
import WeekDayCell from "@screens/protected/tasks/components/WeekDayCell";
import { c } from "@theme/colors";
import { styles } from "./WeekStrip.styles";
import type { WeekStripProps } from "./WeekStrip.types";

// Həftə zolağı (şüşəvari kart): üstdə ox + aralıq ("2–8 noyabr") + ox, altında 7 gün. "Bu gün" düyməsi başqa gündə görünür.
function WeekStrip({ from, strip, day, today, onSelect, onShift }: WeekStripProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Pressable onPress={() => onShift(-1)} hitSlop={10} style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}>
          <ChevronLeftIcon size={18} color={c.muted} />
        </Pressable>
        <Text style={styles.range}>{weekRange(from)}</Text>
        {day !== today && (
          <Pressable onPress={() => onSelect(today)} hitSlop={8} style={({ pressed }) => pressed && styles.pressed}>
            <Text style={styles.today}>Bu gün</Text>
          </Pressable>
        )}
        <Pressable onPress={() => onShift(1)} hitSlop={10} style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}>
          <ChevronRightIcon size={18} color={c.muted} />
        </Pressable>
      </View>
      <View style={styles.days}>
        {strip.map((d) => <WeekDayCell key={d.day} d={d} selected={d.day === day} isToday={d.day === today} onPress={onSelect} />)}
      </View>
    </View>
  );
}

export default WeekStrip;
