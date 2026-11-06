import { Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { UsersIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./GroupMates.styles";
import type { GroupMatesProps } from "./GroupMates.types";

// Qrup tapşırığı: yoldaşların üst-üstə düşən şəkilləri + adları. Biri "görüldü" basanda hamı üçün görülür.
function GroupMates({ mates }: GroupMatesProps) {
  if (mates.length === 0) return null;
  return (
    <View style={styles.row}>
      <UsersIcon size={14} color={c.violet} />
      <View style={styles.stack}>
        {mates.slice(0, 4).map((m, i) => (
          <View key={m.id} style={[styles.face, i > 0 && styles.overlap]}>
            <Avatar name={m.full_name} photo={m.photo_url} size={22} />
          </View>
        ))}
      </View>
      <Text style={styles.names} numberOfLines={1}>{mates.map((m) => m.full_name.split(/\s+/)[1] ?? m.full_name).join(", ")}</Text>
    </View>
  );
}

export default GroupMates;
