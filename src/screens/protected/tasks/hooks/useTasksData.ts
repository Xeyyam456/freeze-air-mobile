import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchDayTasks, fetchWeek } from "@shared/services/tasks.service";
import { buildRows, weekDays } from "@shared/utils/helpers/tasks";
import { addDays } from "@shared/utils/helpers/time";

// Günün tapşırıqları + həftə zolağı. Keşdən dərhal (MMKV), arxada təzələnir; canlı yenilənmə usePanelLive ilə.
function useTasksData(day: string, from: string, days: string[], me: number | undefined) {
  const tasks = useQuery({ queryKey: queryKeys.tasksDay(day), queryFn: () => fetchDayTasks(day) });
  const week = useQuery({ queryKey: queryKeys.tasksWeek(from), queryFn: () => fetchWeek(from, addDays(from, 6)) });

  const rows = useMemo(() => buildRows(tasks.data, me), [tasks.data, me]);
  const strip = useMemo(() => weekDays(days, week.data ?? [], me), [days, week.data, me]);
  const summary = useMemo(() => {
    const mine = (tasks.data?.tasks ?? []).filter((t) => t.employee_id === me && !t.cancelled_at);
    return { total: mine.length, done: mine.filter((t) => t.done).length };
  }, [tasks.data, me]);

  return {
    data: tasks.data,
    rows,
    strip,
    summary,
    error: tasks.error && !tasks.data,
    loading: tasks.isPending,
    reload: () => Promise.all([tasks.refetch(), week.refetch()]),
  };
}

export default useTasksData;
