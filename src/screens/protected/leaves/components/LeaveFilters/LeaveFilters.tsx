import { Pressable, Text, View } from "react-native";
import type { LeaveFilter } from "@typings/leaves";
import { styles } from "./LeaveFilters.styles";
import type { LeaveFiltersProps } from "./LeaveFilters.types";

const CHIPS: [LeaveFilter, string][] = [["all", "Hamısı"], ["approved", "Təsdiqlənən"], ["rejected", "Rədd edilən"], ["cancelled", "Ləğv etdiyim"]];

// Tarixçə süzgəci: 2×2 çip (ad + say)
function LeaveFilters({ value, counts, onChange }: LeaveFiltersProps) {
  return (
    <View style={styles.grid}>
      {CHIPS.map(([key, label]) => {
        const on = value === key;
        return (
          <Pressable key={key} onPress={() => onChange(key)} style={[styles.chip, on && styles.on]}>
            <Text style={[styles.label, on && styles.labelOn]} numberOfLines={1}>{label}</Text>
            <Text style={[styles.count, on && styles.countOn]}>{counts[key]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default LeaveFilters;
