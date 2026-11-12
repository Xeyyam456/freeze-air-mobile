import { memo } from "react";
import { View } from "react-native";
import { styles } from "./VoiceWave.styles";
import type { VoiceWaveProps } from "./VoiceWave.types";

// Səs dalğası: sütunlar yazı zamanı ölçülmüş səviyyədir; oxunan yerə qədər rənglənir
function VoiceWave({ peaks, progress, color, dim, height = 28 }: VoiceWaveProps) {
  const cut = progress * peaks.length;
  return (
    <View style={[styles.row, { height }]}>
      {peaks.map((p, i) => (
        <View key={i} style={[styles.bar, { height: Math.max(3, (p / 100) * height), backgroundColor: i < cut ? color : dim }]} />
      ))}
    </View>
  );
}

export default memo(VoiceWave);
