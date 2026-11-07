import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import PersonCard from "@shared/components/PersonCard";
import PersonSheet from "@shared/components/PersonSheet";
import ScreenHeader from "@shared/components/ScreenHeader";
import useReload from "@shared/hooks/useReload";
import LeadCard from "@screens/protected/management/components/LeadCard";
import useManagers from "@screens/protected/management/hooks/useManagers";
import { c } from "@theme/colors";
import type { Person } from "@typings/team";
import { styles } from "./ManagementScreen.styles";

// Rəhbərlik (web /rehberlik, yalnız baxış): müdir üstdə iri kartda, altında digər rəhbərlər; toxunuş → məlumat pəncərəsi
function ManagementScreen() {
  const insets = useSafeAreaInsets();
  const m = useManagers();
  const { refreshing, onRefresh } = useReload(m.reload);
  const [open, setOpen] = useState<Person | null>(null);
  const empty = !m.lead && !m.rest.length;

  return (
    <View style={styles.flex}>
      <FlashList
        data={m.rest}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => <PersonCard person={item} subtitle={item.position || "Rəhbərlik"} onPress={setOpen} />}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <ScreenHeader title="Rəhbərlik" sub="Müdir, servis müdirləri və maliyyəçi" />
              {m.lead ? <LeadCard person={m.lead} onPress={setOpen} /> : null}
            </View>
            {m.rest.length ? <Text style={styles.section}>{m.lead ? "Komanda rəhbərləri" : "Rəhbərlik"} · {m.rest.length}</Text> : null}
          </View>
        }
        ListEmptyComponent={m.error ? <ErrorState message="Rəhbərlik yüklənmədi." onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : empty ? <Text style={styles.empty}>Hələ rəhbər əlavə olunmayıb.</Text> : null}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
      {open && <PersonSheet person={open} subtitle={open.position || "Rəhbərlik"} onClose={() => setOpen(null)} />}
    </View>
  );
}

export default ManagementScreen;
