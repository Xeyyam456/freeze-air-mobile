import { memo } from "react";
import { Text, View } from "react-native";
import { azn, dayName, fmtKm, WEEKDAY_SHORT, weekdayOf } from "@shared/utils/helpers/fuel";
import { styles } from "./UnpaidRow.styles";
import type { UnpaidRowProps } from "./UnpaidRow.types";

// Pulu verilməmiş (və ya yarımçıq verilmiş) gün: tarix, getdiyin km, verilməyən məbləğ. memo: FlashList sətri
function UnpaidRow({ day, km, due, partial }: UnpaidRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.bar} />
      <View style={styles.text}>
        <Text style={styles.day}>{dayName(day)} <Text style={styles.weekday}>· {WEEKDAY_SHORT[weekdayOf(day)]}</Text></Text>
        <Text style={styles.km}>{fmtKm(km)} km yol{partial ? " · pulun bir hissəsi verilib" : ""}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.due}>{azn(due)}</Text>
        <Text style={styles.label}>{partial ? "qalıb" : "verilməyib"}</Text>
      </View>
    </View>
  );
}

export default memo(UnpaidRow);
