import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ScreenHeader from "@shared/components/ScreenHeader";
import SearchPill from "@shared/components/SearchPill";
import useReload from "@shared/hooks/useReload";
import Ambient from "@screens/protected/errorCodes/components/Ambient";
import CodeRow from "@screens/protected/errorCodes/components/CodeRow";
import CodeSheet from "@screens/protected/errorCodes/components/CodeSheet";
import GroupHead from "@screens/protected/errorCodes/components/GroupHead";
import ModelPicker from "@screens/protected/errorCodes/components/ModelPicker";
import RecentCodes from "@screens/protected/errorCodes/components/RecentCodes";
import useErrorCodes from "@screens/protected/errorCodes/hooks/useErrorCodes";
import { c } from "@theme/colors";
import type { CodeRowItem } from "@typings/errorCodes";
import { styles } from "./ErrorCodesScreen.styles";

// Xəta kodları (yalnız baxış): iri axtarış həbi (kod və ya söz), model seçimi (tək düymə → siyahı), son baxılanlar, kodlar hərf qruplarında
// (hər qrup bir kart). Sətirə toxunuş → alt paneldə iri kod, açıqlama və "Edilecək iş" addımlar xətti kimi
function ErrorCodesScreen() {
  const insets = useSafeAreaInsets();
  const m = useErrorCodes();
  const { refreshing, onRefresh } = useReload(m.reload);
  const first = m.rows.find((r): r is Extract<CodeRowItem, { type: "code" }> => r.type === "code");

  const renderItem = ({ item }: { item: CodeRowItem }) => item.type === "head"
    ? <GroupHead letter={item.letter} count={item.count} />
    : <CodeRow code={item.code} first={item.first} last={item.last} onPress={m.openCode} />;

  return (
    <View style={styles.flex}>
      <Ambient />
      <FlashList
        data={m.rows}
        keyExtractor={(r) => r.key}
        getItemType={(r) => r.type}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="Xəta kodları" sub="Kondisioner xəta kodları və edilecək iş" />
            <Animated.View entering={FadeInDown.duration(380)}><SearchPill upper placeholder="Kod və ya söz: E4, kompressor..." value={m.query} onChange={m.setQuery} onSubmit={() => m.total === 1 && first && m.openCode(first.code)}
              hint={m.query && m.total ? `${m.total} uyğun kod` : " "} /></Animated.View>
            <Animated.View entering={FadeInDown.delay(70).duration(380)}><ModelPicker models={m.models} counts={m.counts} value={m.modelId} onChange={m.setModelId} /></Animated.View>
            {!m.query ? <Animated.View entering={FadeInDown.delay(140).duration(380)}><RecentCodes codes={m.recent} names={m.names} onOpen={m.openCode} /></Animated.View> : null}
          </View>
        }
        ListEmptyComponent={m.error ? <ErrorState message="Xəta kodları yüklənmədi." onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : <Text style={styles.empty}>{m.query ? "Heç nə tapılmadı." : "Hələ xəta kodu əlavə olunmayıb."}</Text>}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
      {m.open ? (
        <CodeSheet code={m.open} modelName={m.modelName} twins={m.twins.map((t) => ({ ...t, model: m.names.get(t.model_id) ?? "" }))}
          prev={m.prev} next={m.next} onSelect={m.openCode} onClose={m.closeCode} />
      ) : null}
    </View>
  );
}

export default ErrorCodesScreen;
