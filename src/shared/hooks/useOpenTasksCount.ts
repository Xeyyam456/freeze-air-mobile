import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchDayTasks } from "@shared/services/tasks.service";
import { todayBaku } from "@shared/utils/helpers/time";
import useMe from "@shared/hooks/useMe";
import type { DayTasks } from "@typings/tasks";

// Mənim bugünkü görülməmiş tapşırıqlarımın sayı (tab bar nişanı).
// Tapşırıqlar ekranı ilə EYNİ keş açarı: "görüldü" optimistik basılan an nişan da dərhal azalır,
// əlavə sorğu yoxdur və tab açılanda siyahı artıq hazırdır. Canlı yenilənmə usePanelLive (tasks → tasks-view).
const openOf = (me: number | undefined) => (d: DayTasks) =>
  d.tasks.filter((t) => t.employee_id === me && !t.done && !t.cancelled_at).length;

function useOpenTasksCount() {
  const me = useMe().data?.employee?.id;
  const day = todayBaku();
  const { data } = useQuery({ queryKey: queryKeys.tasksDay(day), queryFn: () => fetchDayTasks(day), enabled: !!me, select: openOf(me) });
  return data ?? 0;
}

export default useOpenTasksCount;
