import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ScreenHeader from "@shared/components/ScreenHeader";
import useReload from "@shared/hooks/useReload";
import LeaveCard from "@screens/protected/leaves/components/LeaveCard";
import LeaveFilters from "@screens/protected/leaves/components/LeaveFilters";
import LeavesHero from "@screens/protected/leaves/components/LeavesHero";
import useLeaveActions from "@screens/protected/leaves/hooks/useLeaveActions";
import useMyLeaves from "@screens/protected/leaves/hooks/useMyLeaves";
import { c } from "@theme/colors";
import type { LeaveRow } from "@typings/leaves";
import type { RootStackParamList } from "@typings/navigation";
import { styles } from "./LeavesScreen.styles";

// İcazələrim (web /icazelerim): xülasə + "İcazə istə", aktiv/gözləyən sorğular, aylara görə tarixçə (süzgəclə).
// Keşdən dərhal; canlı: admin təsdiqləyəndə/rədd edəndə dərhal dəyişir (usePanelLive)
function LeavesScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProp<RootStackParamList>>();
  const m = useMyLeaves();
  const { giveUp, cancel } = useLeaveActions(m.me);
  const { refreshing, onRefresh } = useReload(m.reload);

  const renderItem = ({ item }: { item: LeaveRow }) => {
    if (item.kind === "title") return <Text style={styles.title}>{item.title}</Text>;
    if (item.kind === "empty") return <Text style={styles.empty}>{item.text}</Text>;
    if (item.kind === "month") return <Text style={styles.month}>{item.label}</Text>;
    if (item.kind === "filters") return <LeaveFilters value={m.filter} counts={m.counts} onChange={m.setFilter} />;
    return <LeaveCard leave={item.leave} active={item.active} today={m.today} onGiveUp={giveUp} onCancel={cancel} />;
  };

  return (
    <View style={styles.flex}>
      <FlashList
        data={m.rows}
        keyExtractor={(r) => r.key}
        getItemType={(r) => r.kind}
        renderItem={renderItem}
        extraData={m.filter}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="İcazələrim" sub="İcazə istə, sorğuların və tarixçə" />
            <LeavesHero stats={m.stats} onRequest={() => nav.navigate("LeaveRequest")} />
          </View>
        }
        ListEmptyComponent={m.error ? <ErrorState message="İcazələr yüklənmədi." onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : !m.me ? <Text style={styles.empty}>İcazə yalnız usta kartı olan hesabla istənilir.</Text> : null}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default LeavesScreen;
