import { memo } from "react";
import { Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { timeBaku } from "@shared/utils/time";
import GlassSheen from "@shared/components/GlassSheen";
import { styles } from "./WorkRow.styles";
import type { WorkRowProps } from "./WorkRow.types";

// Zaman xətti sətri: solda saat + nöqtə + şaquli xətt, sağda kim (üst-üstə avatarlar, ən çox 3) / harada (firuzəyi, lentdəki kimi) / nə iş. memo: FlashList təkrar render etməsin
function WorkRow({ log }: WorkRowProps) {
  const names = log.people.map((p) => p.name).join(", ");
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <Text style={styles.time}>{timeBaku(log.created_at)}</Text>
        <View style={styles.dot} />
        <View style={styles.line} />
      </View>
      <View style={styles.card}>
        <GlassSheen radius={16} strength={0.8} />
        <View style={styles.top}>
          <View style={styles.stack}>
            {log.people.slice(0, 3).map((p, i) => (
              <View key={p.name} style={[styles.ava, i > 0 && styles.avaNext, { zIndex: 3 - i }]}><Avatar name={p.name} photo={p.photo} size={26} /></View>
            ))}
          </View>
          <Text style={styles.name} numberOfLines={2}>{names}</Text>
        </View>
        <Text style={styles.place} numberOfLines={1}>{log.place}</Text>
        <Text style={styles.desc} numberOfLines={2}>{log.description}</Text>
      </View>
    </View>
  );
}

export default memo(WorkRow);
