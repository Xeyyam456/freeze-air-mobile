import { Text, View } from "react-native";
import { toneOf } from "@shared/config/codeTones";
import { styles } from "./GroupHead.styles";
import type { GroupHeadProps } from "./GroupHead.types";

// Qrup başlığı: rəngli hərf lövhəsi + solan xətt + kod sayı
function GroupHead({ letter, count }: GroupHeadProps) {
  const tone = toneOf(letter);
  return (
    <View style={styles.row}>
      <View style={[styles.tile, { backgroundColor: `${tone}1f`, borderColor: `${tone}55` }]}><Text style={[styles.letter, { color: tone }]}>{letter}</Text></View>
      <View style={[styles.line, { backgroundColor: `${tone}33` }]} />
      <Text style={styles.count}>{count} kod</Text>
    </View>
  );
}

export default GroupHead;
