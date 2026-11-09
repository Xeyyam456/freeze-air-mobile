import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import GlassSheen from "@shared/components/GlassSheen";
import { styles } from "./TopPlaces.styles";
import type { TopPlacesProps } from "./TopPlaces.types";

// Nisbət zolağı: ən çoxa görə en (100%), açılışda soldan böyüyür
function Meter({ ratio, first, index }: { ratio: number; first: boolean; index: number }) {
  const p = useSharedValue(0);
  useEffect(() => { p.value = withDelay(350 + index * 80, withTiming(ratio, { duration: 650, easing: Easing.out(Easing.cubic) })); }, [ratio, index, p]);
  const fill = useAnimatedStyle(() => ({ width: `${Math.max(4, p.value * 100)}%` }));
  return <View style={styles.track}><Animated.View style={[styles.fill, first ? styles.fillFirst : null, fill]} /></View>;
}

// Bu ay ən çox işlədiyim yerlər: nömrə, ad, say + altında nisbət zolağı (birinci vurğu rəngində) — sakit siyahı
function TopPlaces({ places }: TopPlacesProps) {
  if (places.length === 0) return null;
  const max = Math.max(1, ...places.map((p) => p.count));
  return (
    <Animated.View entering={FadeInDown.delay(300).duration(450)} style={styles.card}>
      <GlassSheen />
      <Text style={styles.kicker}>ƏN ÇOX İŞLƏDİYİM YERLƏR</Text>
      {places.map((p, i) => (
        <View key={p.name} style={[styles.row, i > 0 && styles.divider]}>
          <Text style={[styles.rank, i === 0 && styles.rankFirst]}>{i + 1}</Text>
          <View style={styles.main}>
            <View style={styles.line}>
              <Text style={styles.name} numberOfLines={1}>{p.name}</Text>
              <Text style={styles.count}>{p.count}</Text>
            </View>
            <Meter ratio={p.count / max} first={i === 0} index={i} />
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

export default TopPlaces;
