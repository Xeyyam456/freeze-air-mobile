import { memo } from "react";
import { Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { timeBaku } from "@shared/utils/time";
import { styles } from "./WorkRow.styles";
import type { WorkRowProps } from "./WorkRow.types";

// Zaman xətti sətri: solda saat + nöqtə + şaquli xətt, sağda kim / harada / nə iş. memo: FlashList təkrar render etməsin
function WorkRow({ log }: WorkRowProps) {
  const names = log.people.map((p) => p.name).join(", ");
  const first = log.people[0];
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <Text style={styles.time}>{timeBaku(log.created_at)}</Text>
        <View style={styles.dot} />
        <View style={styles.line} />
      </View>
      <View style={styles.card}>
        <View style={styles.top}>
          {first && <Avatar name={first.name} photo={first.photo} size={26} />}
          <Text style={styles.name} numberOfLines={1}>{names}</Text>
        </View>
        <Text style={styles.place} numberOfLines={1}>{log.place}</Text>
        <Text style={styles.desc} numberOfLines={2}>{log.description}</Text>
      </View>
    </View>
  );
}

export default memo(WorkRow);
