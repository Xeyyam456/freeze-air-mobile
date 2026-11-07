import { Text, View } from "react-native";
import { styles } from "./StatBox.styles";
import type { StatBoxProps } from "./StatBox.types";

// Rəqəm qutusu (web "ClientStat"/"HeroStat"): kiçik böyük hərfli ad + iri rəqəm; tone — vurğu rəngi
function StatBox({ label, value, tone, dark = false }: StatBoxProps) {
  return (
    <View style={[styles.box, dark ? styles.dark : styles.light]}>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
      <Text style={[styles.value, tone ? { color: tone } : null]} numberOfLines={1}>{value}</Text>
    </View>
  );
}

export default StatBox;
