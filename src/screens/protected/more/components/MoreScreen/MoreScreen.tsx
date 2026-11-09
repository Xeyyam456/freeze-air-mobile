import useTabScrollTop from "@shared/hooks/useTabScrollTop";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import { MORE_GROUPS } from "@shared/config/more";
import { stamp } from "@shared/utils/leaves";
import MoreRow from "@screens/protected/more/components/MoreRow";
import type { MoreStackParamList } from "@typings/navigation";
import { styles } from "./MoreScreen.styles";

// Hər qrupun ilk sətrinin ümumi sırası (animasiya gecikməsi qruplar boyu davam etsin)
const OFFSETS = MORE_GROUPS.map((_, gi) => MORE_GROUPS.slice(0, gi).reduce((n, g) => n + g.links.length, 0));

// Daha çox (status bar örtüyü: sürüşən məzmun saat/şəbəkə/batareya altında görünmür): web usta panelinin yan menyusu kimi qruplar (Gündəlik, Məlumat, Komanda); hər sətir öz ekranını açır
function MoreScreen() {
  const scrollRef = useTabScrollTop(); // aktiv taba yenidən basanda yuxarı
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProp<MoreStackParamList>>();
  return (
    <View style={styles.flex}>
    <ScrollView ref={scrollRef} style={styles.flex} contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Daha çox</Text>
      {MORE_GROUPS.map((g, gi) => (
        <View key={g.title} style={styles.group}>
          <Text style={styles.groupTitle}>{g.title}</Text>
          <View style={styles.card}>
            {g.links.map((l, i) => <MoreRow key={l.route} link={l} first={i === 0} index={OFFSETS[gi] + i} onPress={() => nav.navigate(l.route)} />)}
          </View>
        </View>
      ))}
      {/* Versiya: OTA yeniləmə gəlibsə tarixi görünür (hansı kodun işlədiyini yoxlamaq üçün) */}
      <Text style={styles.version}>Freeze Air {Constants.expoConfig?.version ?? ""} · {Updates.isEmbeddedLaunch || !Updates.createdAt ? "daxili versiya" : `yeniləmə ${stamp(Updates.createdAt.toISOString())}`}</Text>
    </ScrollView>
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default MoreScreen;
