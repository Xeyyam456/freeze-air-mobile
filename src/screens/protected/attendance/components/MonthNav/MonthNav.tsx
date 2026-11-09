import { Pressable, Text, View } from "react-native";
import { ChevronLeftIcon, ChevronRightIcon } from "@shared/icons";
import { monthTitle } from "@shared/utils/helpers/attendanceView";
import { c } from "@theme/colors";
import { styles } from "./MonthNav.styles";
import type { MonthNavProps } from "./MonthNav.types";

// Ay seçimi: ‹ Noyabr 2026 › (gələcək ay bağlıdır)
function MonthNav({ month, isCurrent, onShift }: MonthNavProps) {
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onShift(-1)} hitSlop={8} style={styles.arrow} accessibilityLabel="Əvvəlki ay">
        <ChevronLeftIcon size={18} color={c.ink} />
      </Pressable>
      <Text style={styles.title}>{monthTitle(month)}</Text>
      <Pressable onPress={() => onShift(1)} disabled={isCurrent} hitSlop={8} style={[styles.arrow, isCurrent && styles.off]} accessibilityLabel="Növbəti ay">
        <ChevronRightIcon size={18} color={c.ink} />
      </Pressable>
    </View>
  );
}

export default MonthNav;
