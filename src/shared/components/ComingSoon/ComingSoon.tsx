import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { c } from "@theme/colors";
import { styles } from "./ComingSoon.styles";
import type { ComingSoonProps } from "./ComingSoon.types";

// Hələ hazır olmayan bölmə: başlıq, ikon, qısa izah (tab bar boş qalmasın)
function ComingSoon({ title, icon: Icon, text }: ComingSoonProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.flex, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.center}>
        <View style={styles.tile}><Icon size={30} color={c.primary} /></View>
        <Text style={styles.soon}>Tezliklə</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

export default ComingSoon;
