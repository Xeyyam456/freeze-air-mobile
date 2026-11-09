import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchMonthOverview } from "@shared/services/overview.service";
import { fetchMyDayStats } from "@shared/services/stats.service";
import { fetchDayLogs } from "@shared/services/work.service";
import { todayBaku } from "@shared/utils/helpers/time";

// Panelin məlumatı: göstəricilər + ayın icmalı (öz) + günün işləri (hamı). Keşdən dərhal, arxada təzələnir.
function usePanelData(employeeId: number | undefined) {
  const day = todayBaku();
  const enabled = !!employeeId;
  const stats = useQuery({ queryKey: queryKeys.stats(employeeId ?? 0), queryFn: () => fetchMyDayStats(employeeId!), enabled });
  const overview = useQuery({ queryKey: queryKeys.overview(employeeId ?? 0), queryFn: () => fetchMonthOverview(employeeId!), enabled });
  const logs = useQuery({ queryKey: queryKeys.workHistory(day), queryFn: () => fetchDayLogs(day) });

  const reload = () => Promise.all([stats.refetch(), overview.refetch(), logs.refetch()]);
  return {
    day,
    stats: stats.data,
    overview: overview.data,
    logs: logs.data,
    logsError: logs.error,
    logsLoading: logs.isPending,
    reload,
  };
}

export default usePanelData;
