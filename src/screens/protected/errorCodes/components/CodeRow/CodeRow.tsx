import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { toneOf } from "@shared/config/codeTones";
import { ChevronRightIcon } from "@shared/icons";
import { isNoInfo } from "@shared/utils/errorCodes";
import { c } from "@theme/colors";
import { styles } from "./CodeRow.styles";
import type { CodeRowProps } from "./CodeRow.types";

// Siyahı sətri: solda kod lövhəsi (ailə rəngində incə ton; izahı yoxdursa sönük), ortada izah, sağda ox. Basanda sətir yumşaq kiçilir. memo: FlashList sətri
function CodeRow({ code, first, last, onPress }: CodeRowProps) {
  const off = isNoInfo(code);
  const tone = toneOf(code.code[0] ?? "");
  const k = useSharedValue(1);
  const scale = useAnimatedStyle(() => ({ transform: [{ scale: k.value }] }));
  return (
    <Animated.View style={scale}>
      <Pressable onPress={() => onPress(code)} onPressIn={() => { k.value = withTiming(0.985, { duration: 90 }); }} onPressOut={() => { k.value = withTiming(1, { duration: 160 }); }}
        style={[styles.row, first && styles.first, last ? styles.last : styles.divider]} accessibilityLabel={`Kod ${code.code}`}>
        <View style={[styles.plate, off ? styles.plateOff : { backgroundColor: `${tone}1a`, borderColor: `${tone}50` }]}><Text style={[styles.code, off && styles.codeOff]}>{code.code}</Text></View>
        <View style={styles.text}><Text style={[styles.title, off && styles.titleOff]} numberOfLines={2}>{off ? "İzahı kitabçada yoxdur" : code.title}</Text></View>
        <ChevronRightIcon size={18} color={c.faint} />
      </Pressable>
    </Animated.View>
  );
}

export default memo(CodeRow);
