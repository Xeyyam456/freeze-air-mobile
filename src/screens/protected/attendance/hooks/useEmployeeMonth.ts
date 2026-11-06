import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchEmployeeMonth } from "@shared/services/attendanceMonth.service";

// Ustanın ayı (təqvim + saatlar): keşdən dərhal, canlı yenilənir (usePanelLive)
function useEmployeeMonth(employeeId: number, month: string) {
  const q = useQuery({ queryKey: queryKeys.employeeMonth(employeeId, month), queryFn: () => fetchEmployeeMonth(employeeId, month) });
  return { data: q.data ?? null, error: !!q.error && !q.data, reload: q.refetch };
}

export default useEmployeeMonth;
