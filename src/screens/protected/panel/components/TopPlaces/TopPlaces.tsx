import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { styles } from "./TopPlaces.styles";
import type { TopPlacesProps } from "./TopPlaces.types";

// Bu ay ən çox işlədiyim yerlər: nömrə, ad, say — sakit siyahı, incə ayırıcılar
function TopPlaces({ places }: TopPlacesProps) {
  if (places.length === 0) return null;
  return (
    <Animated.View entering={FadeInDown.delay(300).duration(450)} style={styles.card}>
      <Text style={styles.kicker}>ƏN ÇOX İŞLƏDİYİM YERLƏR</Text>
      {places.map((p, i) => (
        <View key={p.name} style={[styles.row, i > 0 && styles.divider]}>
          <Text style={[styles.rank, i === 0 && styles.rankFirst]}>{i + 1}</Text>
          <Text style={styles.name} numberOfLines={1}>{p.name}</Text>
          <Text style={styles.count}>{p.count}</Text>
        </View>
      ))}
    </Animated.View>
  );
}

export default TopPlaces;
