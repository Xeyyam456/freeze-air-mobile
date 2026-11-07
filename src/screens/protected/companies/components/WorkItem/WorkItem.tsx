import { memo } from "react";
import { Text, View } from "react-native";
import { dayLabel, timeBaku } from "@shared/utils/time";
import { styles } from "./WorkItem.styles";
import type { WorkItemProps } from "./WorkItem.types";

// Yerin son işi (zaman xətti): tarix + saat, iş mətni, filial, işi görən ustalar. memo: FlashList sətri
function WorkItem({ work: w, last }: WorkItemProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rail}><View style={styles.dot} />{!last ? <View style={styles.line} /> : null}</View>
      <View style={styles.body}>
        <Text style={styles.when}>{dayLabel(w.day)} · {timeBaku(w.at)}</Text>
        <Text style={styles.desc} numberOfLines={4}>{w.description || "Təsvir yazılmayıb"}</Text>
        {w.unit ? <Text style={styles.unit}>{w.unit}</Text> : null}
        {w.names.length ? <Text style={styles.who}>{w.names.join(", ")}</Text> : null}
      </View>
    </View>
  );
}

export default memo(WorkItem);
