import { memo } from "react";
import { Text, View } from "react-native";
import { LogInIcon, LogOutIcon } from "@shared/icons";
import { durationText, fullDate, weekdayName } from "@shared/utils/attendanceView";
import { timeBaku } from "@shared/utils/time";
import { c } from "@theme/colors";
import { styles } from "./HoursRow.styles";
import type { HoursRowProps } from "./HoursRow.types";

// Bir gün (web HoursRow): tarix, həftənin günü · müddət; hər seans ayrıca sətirdə gəlmə → getmə. memo: FlashList sətri
function HoursRow({ entry: { day, presence: p } }: HoursRowProps) {
  const dur = durationText(p);
  const multi = p.sessions.length > 1;
  return (
    <View style={styles.row}>
      <View style={styles.date}>
        <Text style={styles.day}>{fullDate(day)}</Text>
        <Text style={styles.sub} numberOfLines={1}>{weekdayName(day)}{dur ? ` · ${dur}` : ""}</Text>
      </View>
      <View style={styles.sessions}>
        {p.sessions.map((x, i) => (
          <View key={x.in} style={styles.session}>
            {multi && <Text style={styles.no}>{i + 1})</Text>}
            <View style={[styles.time, styles.in]}>
              <LogInIcon size={11} color={c.ok} />
              <Text style={[styles.timeText, { color: c.ok }]}>{timeBaku(x.in)}</Text>
            </View>
            {x.out ? (
              <View style={[styles.time, styles.out]}>
                <LogOutIcon size={11} color={c.ink} />
                <Text style={styles.timeText}>{timeBaku(x.out)}</Text>
              </View>
            ) : (
              <Text style={styles.live}>hələ işdədir</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export default memo(HoursRow);
