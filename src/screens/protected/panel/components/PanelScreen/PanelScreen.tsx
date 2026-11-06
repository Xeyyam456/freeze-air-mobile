import { FlashList } from "@shopify/flash-list";
import { Briefcase } from "lucide-react-native";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import useMe from "@shared/hooks/useMe";
import useReload from "@shared/hooks/useReload";
import usePanelData from "@screens/protected/panel/hooks/usePanelData";
import MyDayCard from "@screens/protected/panel/components/MyDayCard";
import PanelHeader from "@screens/protected/panel/components/PanelHeader";
import StatTiles from "@screens/protected/panel/components/StatTiles";
import WorkRow from "@screens/protected/panel/components/WorkRow";
import { c } from "@theme/colors";
import { styles } from "./PanelScreen.styles";

// Panel: bütün ekran bir FlashList-dir — başlıq hissəsi (salam, Mənim bugünüm, göstəricilər) + günün işləri.
// Məlumat keşdən dərhal görünür; aşağı çəkəndə yenilənir; canlı yenilənmə Realtime ilə (usePanelLive).
function PanelScreen() {
  const insets = useSafeAreaInsets();
  const { data: me } = useMe();
  const emp = me?.employee;
  const { day, stats, logs, logsError, logsLoading, reload } = usePanelData(emp?.id);
  const { refreshing, onRefresh } = useReload(reload);

  const header = (
    <View style={styles.header}>
      <PanelHeader name={emp?.full_name ?? me?.email ?? ""} photo={emp?.photo_url ?? null} day={day} />
      {emp ? <MyDayCard employeeId={emp.id} /> : me && <Text style={styles.note}>Hesabına əməkdaş kartı bağlı deyil.</Text>}
      {emp && <StatTiles stats={stats} />}
      <View style={styles.section}>
        <Briefcase size={16} color={c.muted} />
        <Text style={styles.sectionTitle}>Bu gün görülən işlər</Text>
        {logs && <Text style={styles.count}>{logs.length}</Text>}
      </View>
    </View>
  );

  const empty = logsError && !logs ? <ErrorState message="İşlər yüklənmədi." onRetry={reload} />
    : logsLoading ? <ActivityIndicator color={c.muted} style={styles.loader} />
    : <Text style={styles.empty}>Bu gün hələ iş yazılmayıb.</Text>;

  return (
    <View style={styles.flex}>
      <FlashList
        data={logs ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <WorkRow log={item} />}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        ItemSeparatorComponent={Gap}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function Gap() {
  return <View style={styles.gap} />;
}

export default PanelScreen;
