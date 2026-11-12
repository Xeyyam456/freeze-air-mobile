import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { TrashIcon } from "@shared/icons";
import { fmtMs } from "@shared/utils/helpers/voice";
import { c } from "@theme/colors";
import { styles } from "./VoiceRecordBar.styles";
import type { VoiceRecordBarProps } from "./VoiceRecordBar.types";

// Yazı zamanı yazı sahəsinin yerinə: nəbz edən qırmızı nöqtə, sayğac, göstərici (sola — ləğv, yuxarı — kilid) və ya kilidlidə zibil qutusu
function VoiceRecordBar({ ms, locked, onCancel }: VoiceRecordBarProps) {
  const o = useSharedValue(1);
  useEffect(() => { o.value = withRepeat(withTiming(0.25, { duration: 700 }), -1, true); }, [o]);
  const dot = useAnimatedStyle(() => ({ opacity: o.value }));
  return (
    <View style={styles.bar}>
      <Animated.View style={[styles.dot, dot]} />
      <Text style={styles.time}>{fmtMs(ms)}</Text>
      {locked ? (
        <>
          <Text style={styles.hint}>Yazılır… göndərmək üçün oxa toxun</Text>
          <Pressable onPress={onCancel} style={styles.trash} hitSlop={8} accessibilityLabel="Ləğv et"><TrashIcon size={17} color={c.danger} /></Pressable>
        </>
      ) : <Text style={styles.hint}>‹ ləğv · ↑ kilid</Text>}
    </View>
  );
}

export default VoiceRecordBar;
