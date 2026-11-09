import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { setTaskDone } from "@shared/services/tasks.service";
import { flipDone } from "@shared/utils/helpers/tasks";
import { toast } from "@shared/utils/helpers/toast";
import type { DayTasks, Task } from "@typings/tasks";

type Vars = { id: number; group_id: string | null; done: boolean; day: string };

// Yazıdan sonra təzələnənlər: tapşırıqlar, həftə, panel göstəriciləri və günün işləri (iş qeydi avtomatik yaranır)
const AFTER = ["tasks-view", "tasks-week", "my-day-stats", "work-history", "my-overview"];

// "Görüldü" — OPTİMİSTİK: klik anında keş sinxron dəyişir, baza arxada; xətada yalnız həmin tapşırıq geri qayıdır.
// Bir neçə tapşırıq ardıcıl basıla bilər (hər biri öz geri qaytarması ilə); eyni tapşırığa təkrar klik yazı bitənə qədər bloklanır.
// Qaytarılan funksiya sabitdir (useCallback) — memo kartlar boşuna render olmasın.
function useTaskToggle(day: string) {
  const qc = useQueryClient();
  const busy = useRef(new Set<number>());

  const { mutate } = useMutation({
    mutationFn: ({ id, done }: Vars) => setTaskDone(id, done),
    onError: (e, v) => {
      qc.setQueryData<DayTasks>(queryKeys.tasksDay(v.day), (d) => d && flipDone(d, v, !v.done));
      toast.error(e.message);
    },
    onSuccess: (_, v) => {
      if (v.done) toast.success(v.group_id ? "Bütün qrup üçün görüldü" : "Görüldü, iş qeydə alındı");
    },
    onSettled: (_, __, v) => {
      busy.current.delete(v.id);
      AFTER.forEach((k) => qc.invalidateQueries({ queryKey: [k] }));
    },
  });

  return useCallback((t: Task) => {
    if (busy.current.has(t.id) || t.cancelled_at) return;
    busy.current.add(t.id);
    const key = queryKeys.tasksDay(day);
    void qc.cancelQueries({ queryKey: key }); // yolda olan köhnə cavab optimistik vəziyyəti əzməsin
    qc.setQueryData<DayTasks>(key, (d) => d && flipDone(d, t, !t.done));
    mutate({ id: t.id, group_id: t.group_id, done: !t.done, day });
  }, [qc, day, mutate]);
}

export default useTaskToggle;
