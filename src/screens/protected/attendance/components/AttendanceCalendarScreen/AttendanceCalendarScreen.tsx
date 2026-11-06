import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import { ClockIcon } from "@shared/icons";
import useReload from "@shared/hooks/useReload";
import ScreenHeader from "@shared/components/ScreenHeader";
import CalendarGrid from "@screens/protected/attendance/components/CalendarGrid";
import CalendarSummary from "@screens/protected/attendance/components/CalendarSummary";
import HoursRow from "@screens/protected/attendance/components/HoursRow";
import MonthNav from "@screens/protected/attendance/components/MonthNav";
import useEmployeeMonth from "@screens/protected/attendance/hooks/useEmployeeMonth";
import useMonthNav from "@screens/protected/attendance/hooks/useMonthNav";
import { c } from "@theme/colors";
import type { DayEntry, Presence } from "@typings/attendance";
import { styles } from "./AttendanceCalendarScreen.styles";
import type { AttendanceCalendarScreenProps } from "./AttendanceCalendarScreen.types";

type HoursEntry = DayEntry & { presence: Presence };

// Ustanın davamiyyət təqvimi (web AttendanceCalendar): ay seçimi, rəngli təqvim, xülasə, sonra gün-gün gəlmə/getmə saatları (yenidən köhnəyə)
function AttendanceCalendarScreen({ route }: AttendanceCalendarScreenProps) {
  const { employeeId, name } = route.params;
  const insets = useSafeAreaInsets();
  const { month, isCurrent, shift } = useMonthNav();
  const { data, error, reload } = useEmployeeMonth(employeeId, month);
  const { refreshing, onRefresh } = useReload(reload);
  const hours = useMemo(() => (data?.days ?? []).filter((d): d is HoursEntry => !!d.presence).reverse(), [data]);

  return (
    <View style={styles.flex}>
      <FlashList
        data={hours}
        keyExtractor={(d) => d.day}
        renderItem={({ item }) => <HoursRow entry={item} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="Davamiyyət təqvimi" sub={name} />
            <View style={styles.card}>
              <MonthNav month={month} isCurrent={isCurrent} onShift={shift} />
              <CalendarGrid month={month} days={data?.days ?? null} />
              {data && <CalendarSummary summary={data.summary} />}
            </View>
            {error && <ErrorState message="Təqvim yüklənmədi." onRetry={reload} />}
            <View style={styles.hoursHead}>
              <ClockIcon size={15} color={c.primary} />
              <Text style={styles.hoursTitle}>Gəlmə və getmə saatları</Text>
            </View>
          </View>
        }
        ListEmptyComponent={data ? <Text style={styles.empty}>Bu ayda gəlmə qeydi yoxdur.</Text> : null}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default AttendanceCalendarScreen;
