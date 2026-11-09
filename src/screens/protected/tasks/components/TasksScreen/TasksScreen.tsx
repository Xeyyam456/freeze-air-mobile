import useTabScrollTop from "@shared/hooks/useTabScrollTop";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorState from "@shared/components/ErrorState";
import SectionTitle from "@shared/components/SectionTitle";
import useMe from "@shared/hooks/useMe";
import useReload from "@shared/hooks/useReload";
import TaskCard from "@screens/protected/tasks/components/TaskCard";
import TasksHeader from "@screens/protected/tasks/components/TasksHeader";
import TeamCard from "@screens/protected/tasks/components/TeamCard";
import WeekStrip from "@screens/protected/tasks/components/WeekStrip";
import useTaskDay from "@screens/protected/tasks/hooks/useTaskDay";
import useTasksData from "@screens/protected/tasks/hooks/useTasksData";
import useOpenTaskNote from "@screens/protected/tasks/hooks/useOpenTaskNote";
import useTaskToggle from "@screens/protected/tasks/hooks/useTaskToggle";
import { c } from "@theme/colors";
import type { TaskListRow } from "@typings/tasks";
import { styles } from "./TasksScreen.styles";

// Tapşırıqlar: bütün ekran bir FlashList — başlıq + həftə zolağı, sonra "Mənim" kartları və "Komanda" kartları.
// Keşdən dərhal görünür; "görüldü" optimistikdir; canlı yenilənmə usePanelLive (tasks cədvəli) ilə.
function TasksScreen() {
  const scrollRef = useTabScrollTop(); // aktiv taba yenidən basanda yuxarı
  const insets = useSafeAreaInsets();
  const me = useMe().data?.employee?.id;
  const { today, day, from, days, past, setDay, shiftWeek } = useTaskDay();
  const { rows, strip, summary, error, loading, reload } = useTasksData(day, from, days, me);
  const toggle = useTaskToggle(day);
  const openNote = useOpenTaskNote(day);
  const { refreshing, onRefresh } = useReload(reload);

  const renderItem = ({ item }: { item: TaskListRow }) => {
    if (item.kind === "title") return <View style={styles.title}><SectionTitle title={item.title} count={item.count} /></View>;
    if (item.kind === "empty") return <Text style={styles.empty}>{item.text}</Text>;
    if (item.kind === "mine") return <TaskCard task={item.task} mates={item.mates} past={past} onToggle={toggle} onNote={openNote} />;
    return <TeamCard employee={item.employee} tasks={item.tasks} />;
  };

  const empty = error ? <ErrorState message="Tapşırıqlar yüklənmədi." onRetry={reload} />
    : loading ? <ActivityIndicator color={c.muted} style={styles.loader} /> : null;

  return (
    <View style={styles.flex}>
      <FlashList
        ref={scrollRef}
        data={rows}
        keyExtractor={(r) => r.key}
        getItemType={(r) => r.kind}
        renderItem={renderItem}
        extraData={past}
        ListHeaderComponent={
          <View style={styles.header}>
            <TasksHeader day={day} summary={summary} />
            <WeekStrip from={from} strip={strip} day={day} today={today} onSelect={setDay} onShift={shiftWeek} />
          </View>
        }
        ListEmptyComponent={empty}
        contentContainerStyle={{ ...styles.content, paddingTop: insets.top + 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.muted} colors={[c.primary]} progressBackgroundColor={c.surface} />}
        showsVerticalScrollIndicator={false}
      />
      {/* Status bar altına sürüşən məzmun görünməsin */}
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default TasksScreen;
