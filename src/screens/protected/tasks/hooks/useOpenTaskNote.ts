import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import type { RootStackParamList } from "@typings/navigation";
import type { Task } from "@typings/tasks";

// Kartdan "Təmir qeydi" → root stack-dəki TaskNote ekranı. Sabit funksiya (memo kartlar boşuna render olmasın)
function useOpenTaskNote(day: string) {
  const nav = useNavigation<NavigationProp<RootStackParamList>>();
  return useCallback((t: Task) => {
    nav.navigate("TaskNote", {
      task: { id: t.id, group_id: t.group_id, logId: t.work_log_id, reason: t.reason, place: t.place, note: t.note, day },
    });
  }, [nav, day]);
}

export default useOpenTaskNote;
