import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchMyDayStats } from "@shared/services/stats.service";
import { fetchDayLogs } from "@shared/services/work.service";
import { todayBaku } from "@shared/utils/time";

// Panelin məlumatı: göstəricilər (öz) + günün işləri (hamı). Keşdən dərhal, arxada təzələnir.
function usePanelData(employeeId: number | undefined) {
  const day = todayBaku();
  const stats = useQuery({
    queryKey: queryKeys.stats(employeeId ?? 0),
    queryFn: () => fetchMyDayStats(employeeId!),
    enabled: !!employeeId,
  });
  const logs = useQuery({ queryKey: queryKeys.workHistory(day), queryFn: () => fetchDayLogs(day) });

  const reload = () => Promise.all([stats.refetch(), logs.refetch()]);
  return { day, stats: stats.data, logs: logs.data, logsError: logs.error, logsLoading: logs.isPending, reload };
}

export default usePanelData;
