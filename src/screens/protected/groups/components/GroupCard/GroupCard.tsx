import { Pressable, Text, View } from "react-native";
import { ChevronRightIcon } from "@shared/icons";
import { feedWhen } from "@shared/utils/feed";
import ActArt from "@screens/protected/groups/components/ActArt";
import MediaArt from "@screens/protected/groups/components/MediaArt";
import { c } from "@theme/colors";
import { styles } from "./GroupCard.styles";
import type { GroupCardProps } from "./GroupCard.types";

// Qrup sətri (WhatsApp söhbət siyahısı kimi): canlı illüstrasiya ikonu (şəkil + video / akt + möhür), ad, son paylaşımın önizləməsi ("Fərhad: İzmir Villa"), vaxt və say
function GroupCard({ link: { group, label, hint, color }, last, unread, onPress }: GroupCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]} accessibilityLabel={label}>
      <View style={[styles.tile, { backgroundColor: `${color}1f`, borderColor: `${color}40` }]}>{group === "act" ? <ActArt /> : <MediaArt />}</View>
      <View style={styles.text}>
        <View style={styles.top}>
          <Text style={styles.name} numberOfLines={1}>{label}</Text>
          {last ? <Text style={styles.when}>{feedWhen(last.at)}</Text> : null}
        </View>
        <View style={styles.bottom}>
          <Text style={styles.preview} numberOfLines={1}>{last ? `${last.name}: ${last.place}` : hint}</Text>
          {unread > 0 ? <Text style={styles.count}>{unread > 99 ? "99+" : unread}</Text> : null}
        </View>
      </View>
      <ChevronRightIcon size={18} color={c.faint} />
    </Pressable>
  );
}

export default GroupCard;
