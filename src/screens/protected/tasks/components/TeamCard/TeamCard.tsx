import { memo } from "react";
import { Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { CheckIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./TeamCard.styles";
import type { TeamCardProps } from "./TeamCard.types";

// Komanda: bir usta — şəkil, ad, görülən/cəmi; altında tapşırıqları (yer + səbəb, görülübsə yaşıl işarə). Yalnız baxış.
function TeamCard({ employee, tasks }: TeamCardProps) {
  const done = tasks.filter((t) => t.done).length;
  const all = done === tasks.length;
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Avatar name={employee.full_name} photo={employee.photo_url} size={32} />
        <Text style={styles.name} numberOfLines={1}>{employee.full_name}</Text>
        <Text style={[styles.count, all && styles.countDone]}>{done}/{tasks.length}</Text>
      </View>
      {tasks.map((t) => (
        <View key={t.id} style={styles.line}>
          <View style={[styles.dot, t.done && styles.dotDone]}>{t.done && <CheckIcon size={10} color={c.bg} strokeWidth={3.5} />}</View>
          <View style={styles.text}>
            <Text style={styles.place} numberOfLines={1}>{t.place}</Text>
            <Text style={styles.reason} numberOfLines={1}>{t.reason}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default memo(TeamCard);
