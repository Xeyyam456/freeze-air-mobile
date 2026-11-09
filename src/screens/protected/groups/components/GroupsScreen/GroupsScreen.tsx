import useTabScrollTop from "@shared/hooks/useTabScrollTop";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GROUPS } from "@shared/config/groups";
import useFeedUnread from "@shared/hooks/useFeedUnread";
import useFeed from "@screens/protected/feed/hooks/useFeed";
import GroupCard from "@screens/protected/groups/components/GroupCard";
import type { GroupsStackParamList } from "@typings/navigation";
import { styles } from "./GroupsScreen.styles";

// Qruplar (WhatsApp söhbət siyahısı kimi): Görülən işlər və Aktlar. Usta tapşırıq qeydinə fayl yükləyəndə avtomatik buraya düşür.
// Sətirdə son paylaşım və oxunmamış iş sayı (qırmızı rəqəm; canlı: work_files Realtime). Qrupu açanda say sıfırlanır
function GroupsScreen() {
  const scrollRef = useTabScrollTop(); // aktiv taba yenidən basanda yuxarı
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProp<GroupsStackParamList>>();
  const work = useFeed("work");
  const act = useFeed("act");
  const data = { work, act };
  const unread = { work: useFeedUnread("work"), act: useFeedUnread("act") };
  return (
    <View style={styles.flex}>
      <ScrollView ref={scrollRef} style={styles.flex} contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Qruplar</Text>
        <Text style={styles.sub}>Ustaların yüklədiyi şəkil, video və aktlar</Text>
        <View style={styles.list}>
          {GROUPS.map((g) => (
            <GroupCard key={g.route} link={g} last={data[g.group].posts[0] ?? null} unread={unread[g.group]} onPress={() => nav.navigate(g.route)} />
          ))}
        </View>
      </ScrollView>
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default GroupsScreen;
