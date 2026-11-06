import { Text, View } from "react-native";
import { durShort, mins, timeBaku } from "@shared/utils/time";
import { styles } from "./SessionList.styles";
import type { SessionListProps } from "./SessionList.types";

// Bugünkü seanslar (yalnız yenidən işə çıxanda, 2+ seans): nömrə, vaxt aralığı, müddət
function SessionList({ sessions }: SessionListProps) {
  return (
    <View style={styles.list}>
      {sessions.map((x, i) => (
        <View key={x.in} style={[styles.row, i > 0 && styles.divider]}>
          <Text style={[styles.num, !x.out && styles.numLive]}>{i + 1}</Text>
          <Text style={styles.time}>{timeBaku(x.in)} – {x.out ? timeBaku(x.out) : "…"}</Text>
          <Text style={[styles.dur, !x.out && styles.durLive]}>{x.out ? durShort(mins(x.in, x.out)) : "indi işdəsən"}</Text>
        </View>
      ))}
    </View>
  );
}

export default SessionList;
