import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MORE_GROUPS } from "@shared/config/more";
import MoreRow from "@screens/protected/more/components/MoreRow";
import type { MoreStackParamList } from "@typings/navigation";
import { styles } from "./MoreScreen.styles";

// Daha çox: web usta panelinin yan menyusu kimi qruplar (Gündəlik, Məlumat, Komanda); hər sətir öz ekranını açır
function MoreScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProp<MoreStackParamList>>();
  return (
    <ScrollView style={styles.flex} contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Daha çox</Text>
      {MORE_GROUPS.map((g) => (
        <View key={g.title} style={styles.group}>
          <Text style={styles.groupTitle}>{g.title}</Text>
          <View style={styles.card}>
            {g.links.map((l, i) => <MoreRow key={l.route} link={l} first={i === 0} onPress={() => nav.navigate(l.route)} />)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default MoreScreen;
