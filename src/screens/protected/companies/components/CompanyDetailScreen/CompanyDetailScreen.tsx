import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ScreenHeader from "@shared/components/ScreenHeader";
import SearchPill from "@shared/components/SearchPill";
import useReload from "@shared/hooks/useReload";
import Ambient from "@screens/protected/errorCodes/components/Ambient";
import CompanyHero from "@screens/protected/companies/components/CompanyHero";
import LocationSheet from "@screens/protected/companies/components/LocationSheet";
import MapSheet from "@screens/protected/companies/components/MapSheet";
import PlaceMapCard from "@screens/protected/companies/components/PlaceMapCard";
import NavSheet from "@screens/protected/companies/components/NavSheet";
import UnitCard from "@screens/protected/companies/components/UnitCard";
import WorkItem from "@screens/protected/companies/components/WorkItem";
import useCompanyDetail from "@screens/protected/companies/hooks/useCompanyDetail";
import { hasCoords, pct } from "@shared/utils/companies";
import { KIND, isFixed } from "@shared/config/kinds";
import { c } from "@theme/colors";
import type { NavPlace, PlaceRef, PlaceWork, Unit } from "@typings/companies";
import { styles } from "./CompanyDetailScreen.styles";
import type { CompanyDetailScreenProps } from "./CompanyDetailScreen.types";

// Şirkət detalı: vizit kartı (web ilə eyni: rəqəmlər, zəng, Naviqator = Waze / Google Maps), iki tab — Filiallar (7+ olsa axtarışla; hər biri bir kart) və Son işlər (zaman xətti).
// Filialsız şirkət = "Sabit məkan": yalnız Son işlər
function CompanyDetailScreen({ route }: CompanyDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const m = useCompanyDetail(route.params.id);
  const { refreshing, onRefresh } = useReload(m.reload);
  const [nav, setNav] = useState<NavPlace | null>(null);
  const [map, setMap] = useState<PlaceRef | null>(null);
  const [fix, setFix] = useState<PlaceRef | null>(null);
  const ref = (u: Unit): PlaceRef => ({ kind: "store", id: u.id, code: u.code, name: u.name, address: u.address, lat: u.lat, lng: u.lng });
  const coRef = (): PlaceRef => ({ kind: "company", id: m.company?.id ?? 0, name: m.company?.name ?? "", address: m.company?.address ?? null, lat: m.company?.lat ?? null, lng: m.company?.lng ?? null });
  const kind = route.params.kind ?? "company";
  const k = KIND[kind];
  const fixed = isFixed(kind, m.allUnits.length);
  const hasUnits = !fixed;
  const tab = hasUnits ? m.tab : "work";
  const data: (Unit | PlaceWork)[] = tab === "units" ? m.units : m.work;

  const renderItem = ({ item, index }: { item: Unit | PlaceWork; index: number }) => "code" in item
    ? <UnitCard unit={item} onNav={(u) => setNav({ name: `${u.code} ${u.name}`, address: u.address, lat: u.lat, lng: u.lng })} onMap={(u) => setMap(ref(u))} onFix={(u) => setFix(ref(u))} />
    : <WorkItem work={item} last={index === data.length - 1} />;

  return (
    <View style={styles.flex}>
      <Ambient />
      <FlashList
        data={m.company ? data : []}
        keyExtractor={(x) => ("code" in x ? `u${x.id}` : x.key)}
        getItemType={(x) => ("code" in x ? "unit" : "work")}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={tab === "units" ? styles.gap : undefined} />}
        ListHeaderComponent={m.company ? (
          <View style={styles.header}>
            <ScreenHeader title={k.one} sub={hasUnits ? `${m.allUnits.length} ${k.unitLow}` : "Sabit məkan"} />
            <CompanyHero kind={kind} company={m.company} units={m.allUnits.length} coordPct={pct(m.allUnits.filter(hasCoords).length, m.allUnits.length)} works={m.monthWorks} last={m.lastWork}
              onNav={() => setNav({ name: m.company?.name ?? "", address: m.company?.address ?? null, lat: m.company?.lat ?? null, lng: m.company?.lng ?? null })} onMap={() => setMap(coRef())} onFix={() => setFix(coRef())} />
            {fixed ? <PlaceMapCard place={coRef()} /> : null}
            {hasUnits ? (
              <View style={styles.tabs}>
                {([["units", k.units, m.allUnits.length], ["work", "Son işlər", m.work.length]] as const).map(([k, label, n]) => (
                  <Pressable key={k} onPress={() => m.setTab(k)} style={[styles.tab, tab === k && styles.tabOn]}>
                    <Text style={[styles.tabText, tab === k && styles.tabTextOn]}>{label}</Text><Text style={styles.tabCount}>{n}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
            {tab === "units" && m.allUnits.length >= 7 ? <SearchPill placeholder={k.unitSearch} value={m.query} onChange={m.setQuery} /> : null}
          </View>
        ) : <View style={styles.header}><ScreenHeader title={k.one} /></View>}
        ListEmptyComponent={m.error ? <ErrorState message={k.oneError} onRetry={m.reload} />
          : m.missing ? <Text style={styles.empty}>Şirkət tapılmadı.</Text>
          : m.loading || (tab === "work" && m.workLoading) ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : <Text style={styles.empty}>{tab === "units" ? "Heç nə tapılmadı." : "Hələ iş yazılmayıb."}</Text>}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
      {nav ? <NavSheet place={nav} onClose={() => setNav(null)} /> : null}
      {map ? <MapSheet place={map} onNav={() => { setNav({ name: map.name, address: map.address, lat: map.lat, lng: map.lng }); }} onClose={() => setMap(null)} /> : null}
      {fix ? <LocationSheet key={`${fix.kind}${fix.id}`} place={fix} onClose={() => setFix(null)} /> : null}
    </View>
  );
}

export default CompanyDetailScreen;
