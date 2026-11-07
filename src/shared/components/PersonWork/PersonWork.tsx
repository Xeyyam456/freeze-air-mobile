import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import ErrorState from "@shared/components/ErrorState";
import WorkFiles from "@shared/components/WorkFiles";
import useEmployeeWork from "@shared/hooks/useEmployeeWork";
import { PaperclipIcon } from "@shared/icons";
import { dayLabel, timeBaku, todayBaku } from "@shared/utils/time";
import { c } from "@theme/colors";
import type { WorkEntry } from "@typings/team";
import { styles } from "./PersonWork.styles";
import type { PersonWorkProps } from "./PersonWork.types";

// İşin kartı: toxunuş → işin faylları (akt, şəkil, video); fayl varsa sağda sancaq və say
function Entry({ e, onPress }: { e: WorkEntry; onPress: (e: WorkEntry) => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={() => onPress(e)} accessibilityLabel={`${e.place}: faylları aç`}>
      <Text style={styles.time}>{timeBaku(e.created_at)}</Text>
      <View style={styles.text}>
        <Text style={styles.place}>{e.place}</Text>
        {e.company ? <Text style={styles.company}>{e.company}</Text> : null}
        {e.description ? <Text style={styles.desc}>{e.description}</Text> : null}
      </View>
      {e.files > 0 ? <View style={styles.files}><PaperclipIcon size={14} color={c.primary} /><Text style={styles.filesText}>{e.files}</Text></View> : null}
    </Pressable>
  );
}

// Ustanın işləri: harada, nə iş gördü. "Bu gün" — günün qeydləri vaxtla; "Bu ay" — günlərə görə qruplaşmış
function PersonWork({ employeeId, period }: PersonWorkProps) {
  const q = useEmployeeWork(employeeId);
  const [open, setOpen] = useState<WorkEntry | null>(null);
  const today = todayBaku();
  const groups = useMemo(() => {
    const list = (q.data ?? []).filter((e) => period === "month" || e.work_date === today);
    const by = new Map<string, WorkEntry[]>();
    for (const e of list) by.set(e.work_date, [...(by.get(e.work_date) ?? []), e]);
    return [...by.entries()];
  }, [q.data, period, today]);

  if (q.error && !q.data) return <ErrorState message="İşlər yüklənmədi." onRetry={q.refetch} />;
  if (q.isPending) return <ActivityIndicator color={c.muted} style={{ marginVertical: 24 }} />;
  if (!groups.length) return <Text style={styles.empty}>{period === "day" ? "Bu gün iş yazılmayıb." : "Bu ay iş yazılmayıb."}</Text>;

  const total = groups.reduce((n, [, l]) => n + l.length, 0);
  const places = new Set(groups.flatMap(([, l]) => l.map((e) => e.place))).size;
  return (
    <View style={styles.wrap}>
      <Text style={styles.summary}>{total} iş · {places} yer</Text>
      {groups.map(([day, list]) => (
        <View key={day} style={styles.wrap}>
          {period === "month" ? (
            <View style={styles.day}><Text style={styles.dayText}>{dayLabel(day)}</Text><Text style={styles.dayCount}>{list.length} iş</Text></View>
          ) : null}
          {list.map((e) => <Entry key={e.id} e={e} onPress={setOpen} />)}
        </View>
      ))}
      {open && <WorkFiles logIds={open.logIds ?? [open.id]} title={open.place} sub={open.company} onClose={() => setOpen(null)} />}
    </View>
  );
}

export default PersonWork;
