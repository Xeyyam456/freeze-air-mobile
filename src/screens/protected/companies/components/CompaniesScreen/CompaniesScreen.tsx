import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ScreenHeader from "@shared/components/ScreenHeader";
import SearchPill from "@shared/components/SearchPill";
import useReload from "@shared/hooks/useReload";
import Ambient from "@screens/protected/errorCodes/components/Ambient";
import CompanyCard from "@screens/protected/companies/components/CompanyCard";
import CompanySummary from "@screens/protected/companies/components/CompanySummary";
import useCompanies from "@screens/protected/companies/hooks/useCompanies";
import { pct } from "@shared/utils/helpers/companies";
import { KIND } from "@shared/config/kinds";
import { c } from "@theme/colors";
import type { Company } from "@typings/companies";
import type { MoreStackParamList } from "@typings/navigation";
import { styles } from "./CompaniesScreen.styles";
import type { CompaniesScreenProps } from "./CompaniesScreen.types";

// Şirkətlər (yalnız baxış): mühit işığı, web-dəki kimi tünd mavi xülasə kartı, iri axtarış həbi (ad, ünvan, əlaqə şəxsi, telefon), şirkət kartları.
// Toxunuş → şirkətin detalı (filiallar, əlaqə, yol tap, son işlər)
function CompaniesScreen({ kind }: CompaniesScreenProps) {
  const k = KIND[kind];
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProp<MoreStackParamList>>();
  const m = useCompanies(kind);
  const { refreshing, onRefresh } = useReload(m.reload);
  const open = (co: Company) => nav.navigate("CompanyDetail", { id: co.id, name: co.name, kind });

  return (
    <View style={styles.flex}>
      <Ambient />
      <FlashList
        data={m.list}
        keyExtractor={(co) => String(co.id)}
        renderItem={({ item }) => <CompanyCard kind={kind} company={item} works={m.works[item.id] ?? 0} onPress={open} />}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title={k.section} sub={k.sub} />
            <Animated.View entering={FadeInDown.duration(380)}><CompanySummary kind={kind} count={m.totals.companies} units={m.totals.units} fixed={m.totals.fixed} coordPct={m.totals.units ? pct(m.totals.coords, m.totals.units) : null} works={m.totals.works} /></Animated.View>
            <Animated.View entering={FadeInDown.delay(70).duration(380)}>
              <SearchPill placeholder={k.searchTop} value={m.query} onChange={m.setQuery} hint={m.query && m.list.length ? `${m.list.length} ${k.match}` : " "} />
            </Animated.View>
          </View>
        }
        ListEmptyComponent={m.error ? <ErrorState message={k.loadError} onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : <Text style={styles.empty}>{m.query ? "Heç nə tapılmadı." : k.empty}</Text>}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default CompaniesScreen;
