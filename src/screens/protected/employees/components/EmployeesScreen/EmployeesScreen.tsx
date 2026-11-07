import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import PersonCard from "@shared/components/PersonCard";
import PersonSheet from "@shared/components/PersonSheet";
import ScreenHeader from "@shared/components/ScreenHeader";
import useReload from "@shared/hooks/useReload";
import { SearchIcon } from "@shared/icons";
import TeamSummary from "@screens/protected/employees/components/TeamSummary";
import useEmployees from "@screens/protected/employees/hooks/useEmployees";
import { c } from "@theme/colors";
import type { Person } from "@typings/team";
import { styles } from "./EmployeesScreen.styles";

// Ustalar (web /ustalar, yalnız baxış): axtarış, kartda bugünkü vəziyyət + bu gün/ay iş sayı, toxunuş → məlumat pəncərəsi
function EmployeesScreen() {
  const insets = useSafeAreaInsets();
  const m = useEmployees();
  const { refreshing, onRefresh } = useReload(m.reload);
  const [open, setOpen] = useState<Person | null>(null);

  const renderItem = ({ item }: { item: Person }) => (
    <PersonCard person={item} subtitle={item.specialty ?? "İxtisas yazılmayıb"} badge={item.id === m.me ? "Sən" : undefined} highlight={item.id === m.me}
      status={m.data?.status[item.id]} onPress={setOpen}
      stats={[{ label: "BU GÜN", value: m.data?.today[item.id] ?? 0 }, { label: "BU AY", value: m.data?.month[item.id] ?? 0 }]} />
  );

  return (
    <View style={styles.flex}>
      <FlashList
        data={m.people}
        keyExtractor={(p) => String(p.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="Ustalar" sub="Komanda, bu günün vəziyyəti, əlaqə" />
            {m.data ? <TeamSummary total={m.data.people.length} counts={m.counts} filter={m.filter} onChange={m.setFilter} /> : null}
            <View style={styles.search}>
              <SearchIcon size={18} color={c.muted} />
              <TextInput value={m.query} onChangeText={m.setQuery} placeholder="Ad, ixtisas və ya telefon" placeholderTextColor={c.muted} style={styles.input} autoCorrect={false} />
            </View>
          </View>
        }
        ListEmptyComponent={m.error ? <ErrorState message="Ustalar yüklənmədi." onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : <Text style={styles.empty}>{m.query ? "Heç nə tapılmadı." : "Hələ usta əlavə olunmayıb."}</Text>}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
      {open && <PersonSheet person={open} subtitle={open.specialty ?? "İxtisas yazılmayıb"} onClose={() => setOpen(null)} />}
    </View>
  );
}

export default EmployeesScreen;
