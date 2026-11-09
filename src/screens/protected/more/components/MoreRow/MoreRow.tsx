import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { cancelAnimation, Easing, FadeInRight, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming, ZoomIn } from "react-native-reanimated";
import { ChevronRightIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./MoreRow.styles";
import type { MoreRowProps } from "./MoreRow.types";

const CYCLE = 6000; // "işıq dalğası" dövrü: bütün ikonlar eyni dövrdə, sıra ilə (index) bir-bir canlanır
const STEP = 110;

// Menyu sətri: rəngli ikon plitəsi, ad, qısa izah, sağda ox.
// Canlılıq: açılanda sətirlər ardıcıl gəlir (plitə yaylanaraq), ekran açıq olanda hər 6 saniyədə ikonlar yuxarıdan aşağı bir-bir yüngül
// "nəfəs alır" (dalğa); basanda sətir kiçilir, ikon tərpənir. Ekran görünmürsə (başqa tab) animasiya dayanır — batareya
function MoreRow({ link: { icon: Icon, label, hint, color }, first, index, onPress }: MoreRowProps) {
  const focused = useIsFocused();
  const wave = useSharedValue(0);
  const press = useSharedValue(0);
  useEffect(() => {
    if (!focused) { cancelAnimation(wave); wave.value = 0; return; }
    const d = index * STEP;
    const up = withTiming(1, { duration: 320, easing: Easing.out(Easing.quad) });
    const down = withTiming(0, { duration: 420, easing: Easing.inOut(Easing.quad) });
    wave.value = withRepeat(withSequence(withDelay(800 + d, up), down, withDelay(CYCLE - 800 - d - 740, withTiming(0, { duration: 0 }))), -1, false);
    return () => cancelAnimation(wave);
  }, [focused, index, wave]);
  const icon = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.1 * wave.value - 0.08 * press.value }, { rotate: `${-8 * wave.value + 10 * press.value}deg` }],
  }));
  const glow = useAnimatedStyle(() => ({ opacity: 0.12 + 0.22 * wave.value }));
  const row = useAnimatedStyle(() => ({ transform: [{ scale: 1 - 0.02 * press.value }] }));

  return (
    <Animated.View entering={FadeInRight.delay(60 + index * 45).duration(380)}>
      <Animated.View style={row}>
        <Pressable onPress={onPress} onPressIn={() => { press.value = withTiming(1, { duration: 90 }); }} onPressOut={() => { press.value = withSpring(0, { damping: 9, stiffness: 240 }); }}
          style={({ pressed }) => [styles.row, !first && styles.divider, pressed && styles.pressed]}>
          <Animated.View entering={ZoomIn.delay(80 + index * 45).springify().damping(11)} style={[styles.tile, { borderColor: `${color}40` }]}>
            <Animated.View style={[styles.glow, { backgroundColor: color }, glow]} />
            <Animated.View style={icon}><Icon size={19} color={color} /></Animated.View>
          </Animated.View>
          <View style={styles.text}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.hint} numberOfLines={1}>{hint}</Text>
          </View>
          <ChevronRightIcon size={18} color={c.faint} />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

export default MoreRow;
