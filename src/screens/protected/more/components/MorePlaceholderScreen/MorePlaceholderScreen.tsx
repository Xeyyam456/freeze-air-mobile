import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenHeader from "@shared/components/ScreenHeader";
import { MORE_LINK } from "@shared/config/more";
import { styles } from "./MorePlaceholderScreen.styles";
import type { MorePlaceholderScreenProps } from "./MorePlaceholderScreen.types";

// Hələ yazılmayan bölmə: başlıq və ikon marşrut adına görə (shared/config/more.ts). Geri düyməsi və telefonun geri düyməsi işləyir
function MorePlaceholderScreen({ route }: MorePlaceholderScreenProps) {
  const insets = useSafeAreaInsets();
  const { label, hint, icon: Icon, color } = MORE_LINK[route.name];
  return (
    <View style={[styles.flex, { paddingTop: insets.top + 12 }]}>
      <ScreenHeader title={label} sub={hint} />
      <View style={styles.center}>
        <View style={[styles.tile, { backgroundColor: `${color}24` }]}><Icon size={30} color={color} /></View>
        <Text style={styles.soon}>Tezliklə</Text>
        <Text style={styles.text}>Bu bölmə hazırlanır. Hələlik web paneldən istifadə et.</Text>
      </View>
    </View>
  );
}

export default MorePlaceholderScreen;
