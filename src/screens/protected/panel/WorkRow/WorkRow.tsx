import { MapPin } from "lucide-react-native";
import { memo } from "react";
import { Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { timeBaku } from "@shared/utils/time";
import { c } from "@theme/colors";
import { styles } from "./WorkRow.styles";
import type { WorkRowProps } from "./WorkRow.types";

// Görülən iş sətri: kim (qrupda bir neçə üz), saat, yer, nə iş. memo: FlashList təkrar render etməsin
function WorkRow({ log }: WorkRowProps) {
  const names = log.people.map((p) => p.name).join(", ");
  return (
    <View style={styles.row}>
      <View style={styles.faces}>
        {log.people.slice(0, 3).map((p, i) => (
          <View key={p.name} style={i > 0 && styles.overlap}><Avatar name={p.name} photo={p.photo} size={34} /></View>
        ))}
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.name} numberOfLines={1}>{names}</Text>
          <Text style={styles.time}>{timeBaku(log.created_at)}</Text>
        </View>
        <View style={styles.place}>
          <MapPin size={13} color={c.muted} />
          <Text style={styles.placeText} numberOfLines={1}>{log.place}</Text>
        </View>
        <Text style={styles.desc} numberOfLines={2}>{log.description}</Text>
      </View>
    </View>
  );
}

export default memo(WorkRow);
