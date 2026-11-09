import useTabScrollTop from "@shared/hooks/useTabScrollTop";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import useMe from "@shared/hooks/useMe";
import useReload from "@shared/hooks/useReload";
import usePanelData from "@screens/protected/panel/hooks/usePanelData";
import PanelDashboard from "@screens/protected/panel/components/PanelDashboard";
import WorkRow from "@screens/protected/panel/components/WorkRow";
import { c } from "@theme/colors";
import { styles } from "./PanelScreen.styles";

// Panel: bütün ekran bir FlashList-dir — başlıq dashboard-dur, sətirlər günün işləri.
// Məlumat keşdən dərhal görünür; aşağı çəkəndə yenilənir; canlı yenilənmə Realtime ilə (usePanelLive).
function PanelScreen() {
  const scrollRef = useTabScrollTop(); // aktiv taba yenidən basanda yuxarı
  const insets = useSafeAreaInsets();
  const { data: me } = useMe();
  const emp = me?.employee;
  const { day, stats, overview, logs, logsError, logsLoading, reload } = usePanelData(emp?.id);
  const { refreshing, onRefresh } = useReload(reload);

  const empty = logsError && !logs ? <ErrorState message="İşlər yüklənmədi." onRetry={reload} />
    : logsLoading ? <ActivityIndicator color={c.muted} style={styles.loader} />
    : <Text style={styles.empty}>Bu gün hələ iş yazılmayıb.</Text>;

  return (
    <View style={styles.flex}>
      <FlashList
        ref={scrollRef}
        data={logs ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <WorkRow log={item} />}
        ListHeaderComponent={
          <PanelDashboard
            name={emp?.full_name ?? ""}
            email={me?.email ?? ""}
            photo={emp?.photo_url ?? null}
            employeeId={emp?.id}
            day={day}
            stats={stats}
            overview={overview}
            logsCount={logs?.length}
          />
        }
        ListEmptyComponent={empty}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      {/* Status bar altına sürüşən məzmun görünməsin: üstdə fon zolağı */}
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default PanelScreen;
