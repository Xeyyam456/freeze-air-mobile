import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import ScreenHeader from "@shared/components/ScreenHeader";
import SearchPill from "@shared/components/SearchPill";
import useReload from "@shared/hooks/useReload";
import AskSheet from "@screens/protected/tools/components/AskSheet";
import ConfirmRow from "@screens/protected/tools/components/ConfirmRow";
import HoldCard from "@screens/protected/tools/components/HoldCard";
import RequestRow from "@screens/protected/tools/components/RequestRow";
import ReturnSheet from "@screens/protected/tools/components/ReturnSheet";
import WhoHasCard from "@screens/protected/tools/components/WhoHasCard";
import WhoHasSheet from "@screens/protected/tools/components/WhoHasSheet";
import ToolTabs from "@screens/protected/tools/components/ToolTabs";
import ToolsHero from "@screens/protected/tools/components/ToolsHero";
import useMyTools from "@screens/protected/tools/hooks/useMyTools";
import { groupPeople } from "@shared/utils/tools";
import { UndoIcon } from "@shared/icons";
import { c } from "@theme/colors";
import type { MyHold, ToolRow } from "@typings/tools";
import { styles } from "./ToolsScreen.styles";

// Alətlərim (web /aletlerim): xülasə + "Alət istə"; üstündə verilən alətin təsdiqi (Aldım / Almadım); "Məndə olanlar" (Alətlər | Materiallar, axtarış, Qaytar);
// "Sorğularım" (qaytarma, istək; gözləyən istəyi geri götür). Hər əməliyyat klik anında görünür (optimistik); canlı: depo məsulu qəbul edəndə dərhal dəyişir
function ToolsScreen() {
  const insets = useSafeAreaInsets();
  const m = useMyTools();
  const { refreshing, onRefresh } = useReload(m.reload);
  const [asking, setAsking] = useState(false);
  const [returning, setReturning] = useState<MyHold[] | null>(null);
  const [who, setWho] = useState(false);

  const rows = useMemo<ToolRow[]>(() => {
    const out: ToolRow[] = m.list.map((h) => ({ key: `h${h.id}`, kind: "hold", hold: h }));
    if (!out.length) out.push({ key: "h-empty", kind: "empty", text: m.query ? "Heç nə tapılmadı." : m.tab === "tool" ? "Üzərində alət yoxdur." : "Üzərində material yoxdur." });
    out.push({ key: "who", kind: "who" });
    out.push({ key: "t-req", kind: "title", text: "Sorğularım", sub: `son ${m.data?.requests.length ?? 0}` });
    if (!m.data?.requests.length) out.push({ key: "r-empty", kind: "empty", text: "Hələ sorğu yoxdur." });
    else for (const r of m.data.requests) out.push({ key: `r${r.id}`, kind: "req", req: r });
    return out;
  }, [m.list, m.data, m.query, m.tab]);

  const renderItem = ({ item }: { item: ToolRow }) => {
    if (item.kind === "title") return <View style={styles.titleRow}><Text style={styles.title}>{item.text}</Text>{item.sub ? <Text style={styles.sub}>{item.sub}</Text> : null}</View>;
    if (item.kind === "empty") return <Text style={styles.empty}>{item.text}</Text>;
    if (item.kind === "who") return <WhoHasCard people={groupPeople(m.data?.all ?? [], m.me).length} onPress={() => setWho(true)} />;
    if (item.kind === "hold") {
      const can = m.returnable(item.hold);
      return <HoldCard hold={item.hold} returning={m.pendingReturn.get(item.hold.id)} selected={m.selected.has(item.hold.id)} canSelect={can} onToggle={m.toggle} onReturn={(h) => setReturning([h])} onCancel={m.cancel} />;
    }
    if (item.kind === "req") return <RequestRow req={item.req} onCancel={m.cancel} />;
    return null;
  };

  return (
    <View style={styles.flex}>
      <FlashList
        data={m.data ? rows : []}
        keyExtractor={(r) => r.key}
        getItemType={(r) => r.kind}
        renderItem={renderItem}
        extraData={m.selected}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={m.data ? (
          <View style={styles.header}>
            <ScreenHeader title="Alətlərim" sub="Məndəki alət və materiallar" />
            <ToolsHero tools={m.tools.reduce((n, h) => n + h.quantity, 0)} materials={m.materials.length} toConfirm={m.toConfirm.length} pending={m.pendingReq.length} kind={m.tab} onAsk={() => setAsking(true)} />
            {m.toConfirm.length ? (
              <View style={styles.confirm}>
                <Text style={styles.title}>Sənə verildi: təsdiqlə</Text>
                {m.toConfirm.map((h) => <ConfirmRow key={h.id} hold={h} onConfirm={m.confirm} />)}
              </View>
            ) : null}
            <View style={styles.sectionHead}>
              <Text style={styles.title}>Məndə olanlar</Text>
              {m.selectableCount > 0 ? <Pressable onPress={m.toggleAll} hitSlop={8} accessibilityLabel="Hamısını seç"><Text style={styles.link}>{m.allOn ? "Seçimi sil" : "Hamısını seç"}</Text></Pressable> : null}
            </View>
            <ToolTabs value={m.tab} onChange={m.setTab} tools={m.tools.length} materials={m.materials.length} />
            <SearchPill placeholder="Axtar..." value={m.query} onChange={m.setQuery} hint=" " />
          </View>
        ) : null}
        ListEmptyComponent={m.error ? <ErrorState message="Alətlər yüklənmədi." onRetry={m.reload} />
          : m.loading ? <ActivityIndicator color={c.muted} style={styles.loader} />
          : !m.me ? <Text style={styles.empty}>Hesabın əməkdaş kartına bağlı deyil.</Text> : null}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
      {asking && m.data ? <AskSheet stock={m.data.stock} askedIds={m.askedIds} initialKind={m.tab} onSend={m.ask} onClose={() => setAsking(false)} /> : null}
      {m.chosen.length > 0 ? (
        <Pressable onPress={() => setReturning(m.chosen)} style={[styles.bar, { bottom: 96 }]} accessibilityLabel="Seçilənləri qaytar"><UndoIcon size={18} color={c.white} /><Text style={styles.barText}>Seçilənləri qaytar ({m.chosen.length})</Text></Pressable>
      ) : null}
      {returning ? <ReturnSheet key={returning.map((h) => h.id).join()} holds={returning} onSend={m.giveBack} onClose={() => setReturning(null)} /> : null}
      {who && m.data ? <WhoHasSheet all={m.data.all} me={m.me} onClose={() => setWho(false)} /> : null}
    </View>
  );
}

export default ToolsScreen;
