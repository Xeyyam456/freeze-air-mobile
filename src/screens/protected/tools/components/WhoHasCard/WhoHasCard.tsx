import { Pressable, Text, View } from "react-native";
import { ChevronRightIcon, UsersIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./WhoHasCard.styles";
import type { WhoHasCardProps } from "./WhoHasCard.types";

// "Kimdə nə var" girişi: bütün ustaların üzərindəkilər (yalnız baxış); toxunanda alt panel açılır (axtarış + usta siyahısı)
function WhoHasCard({ people, onPress }: WhoHasCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card} accessibilityLabel="Kimdə nə var">
      <View style={styles.tile}><UsersIcon size={20} color={c.white} /></View>
      <View style={styles.text}>
        <Text style={styles.title}>Kimdə nə var</Text>
        <Text style={styles.sub}>{people} ustanın üzərində əşya var</Text>
      </View>
      <ChevronRightIcon size={18} color={c.muted} />
    </Pressable>
  );
}

export default WhoHasCard;
