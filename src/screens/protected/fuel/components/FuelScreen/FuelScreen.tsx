import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ScreenHeader from "@shared/components/ScreenHeader";
import useReload from "@shared/hooks/useReload";
import DailyRow from "@screens/protected/fuel/components/DailyRow";
import DayResult from "@screens/protected/fuel/components/DayResult";
import FuelHero from "@screens/protected/fuel/components/FuelHero";
import FuelStep from "@screens/protected/fuel/components/FuelStep";
import FuelSummary from "@screens/protected/fuel/components/FuelSummary";
import PaymentRow from "@screens/protected/fuel/components/PaymentRow";
import UnpaidRow from "@screens/protected/fuel/components/UnpaidRow";
import useFuel from "@screens/protected/fuel/hooks/useFuel";
import useFuelActions from "@screens/protected/fuel/hooks/useFuelActions";
import { c } from "@theme/colors";
import type { FuelListRow } from "@typings/fuel";
import { styles } from "./FuelScreen.styles";

// Yanacaq (web /yanacaq): maşın + dövr, bu günün və dövrün hesabı, səhər/axşam km (şəkil + rəqəm), günün yekunu,
// verilməmiş pul (ayın ödənilməmiş günləri), şirkətin verdiyi pul (Aldım/Almadım), günlük hesab. Yalnız maşını olan usta. Canlı: mileage_logs, fuel_payments
function FuelScreen() {
  const insets = useSafeAreaInsets();
  const f = useFuel();
  const { save, confirm } = useFuelActions(f);
  const { refreshing, onRefresh } = useReload(f.reload);
  const row = f.todayRow;
  const noCar = f.data && !f.car?.has_car;

  const renderItem = ({ item }: { item: FuelListRow }) => {
    if (item.kind === "title") return <View style={styles.titleRow}><Text style={styles.title}>{item.title}</Text>{item.badge ? <Text style={styles.badge}>{item.badge}</Text> : null}</View>;
    if (item.kind === "empty") return <Text style={styles.empty}>{item.text}</Text>;
    if (item.kind === "payment") return <PaymentRow payment={item.payment} onConfirm={confirm} />;
    if (item.kind === "unpaid") return <UnpaidRow day={item.day} km={item.km} due={item.due} partial={item.partial} />;
    return <DailyRow row={item.row} got={item.got} maxKm={item.maxKm} today={f.today} pay={item.pay} />;
  };

  const header = (
    <View style={styles.header}>
      <ScreenHeader title="Yanacaq" sub="Spidometr, km və yanacaq pulu" />
      {f.data && !noCar && (
        <>
          <FuelHero f={f} />
          <FuelSummary f={f} />
          {(!f.car?.fuel_per_100 || !f.price) && (
            <Text style={styles.warn}>Sərf və ya qiymət hələ yazılmayıb (admin yazır): km yazılır, məbləğ sonra hesablanacaq.</Text>
          )}
          <Text style={styles.title}>Bu gün</Text>
          <FuelStep kind="start" value={row?.start_km ?? null} photo={row?.start_photo ?? null} at={row?.start_at ?? null}
            max={row?.end_km ?? undefined} onSave={(km, uri) => save("start", km, uri)} />
          <FuelStep kind="end" value={row?.end_km ?? null} photo={row?.end_photo ?? null} at={row?.end_at ?? null}
            min={row?.start_km} disabled={!row} onSave={(km, uri) => save("end", km, uri)} />
          {row?.km != null && <DayResult row={row} />}
        </>
      )}
      {noCar && <Text style={styles.empty}>Yanacaq bölməsi yalnız maşını olan usta üçündür.</Text>}
    </View>
  );

  return (
    <View style={styles.flex}>
      <FlashList
        data={noCar ? [] : f.list}
        keyExtractor={(r) => r.key}
        getItemType={(r) => r.kind}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={header}
        ListEmptyComponent={f.error ? <ErrorState message="Yanacaq yüklənmədi." onRetry={f.reload} />
          : f.loading ? <ActivityIndicator color={c.muted} style={styles.loader} /> : null}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default FuelScreen;
