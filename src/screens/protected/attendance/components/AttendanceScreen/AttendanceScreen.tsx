import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import useMe from "@shared/hooks/useMe";
import useReload from "@shared/hooks/useReload";
import AttendanceCard from "@screens/protected/attendance/components/AttendanceCard";
import ScreenHeader from "@shared/components/ScreenHeader";
import MonthNav from "@screens/protected/attendance/components/MonthNav";
import TodayStats from "@screens/protected/attendance/components/TodayStats";
import useAttendanceBoard from "@screens/protected/attendance/hooks/useAttendanceBoard";
import useMonthNav from "@screens/protected/attendance/hooks/useMonthNav";
import { c } from "@theme/colors";
import type { AttendanceEmployee } from "@typings/attendance";
import type { PanelStackParamList } from "@typings/navigation";
import { styles } from "./AttendanceScreen.styles";

// Davamiyyət (web /davamiyyet): ay seçimi, bu günün sayları, bütün ustaların kartları (mən birinci).
// Karta toxunanda ustanın təqvimi. Keşdən dərhal; canlı yenilənmə usePanelLive ilə.
function AttendanceScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProp<PanelStackParamList>>();
  const me = useMe().data?.employee?.id;
  const { month, isCurrent, shift } = useMonthNav();
  const b = useAttendanceBoard(month, me);
  const { refreshing, onRefresh } = useReload(b.reload);
  const open = useCallback((e: AttendanceEmployee) => nav.navigate("AttendanceCalendar", { employeeId: e.id, name: e.full_name }), [nav]);

  return (
    <View style={styles.flex}>
      <FlashList
        data={b.rows}
        keyExtractor={(e) => String(e.id)}
        extraData={b.summaryOf}
        renderItem={({ item }) => (
          <AttendanceCard employee={item} summary={b.summaryOf(item)} isMe={item.id === me} isCurrent={isCurrent} onOpen={open} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="Davamiyyət" sub="İşdə, icazəli, gəlmədi; gəlmə və getmə saatları" />
            <MonthNav month={month} isCurrent={isCurrent} onShift={shift} />
            {isCurrent && <TodayStats totals={b.totals} ready={b.ready} />}
          </View>
        }
        ListEmptyComponent={b.error ? <ErrorState message="Davamiyyət yüklənmədi." onRetry={b.reload} />
          : b.loading ? <ActivityIndicator color={c.muted} style={styles.loader} /> : null}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default AttendanceScreen;
