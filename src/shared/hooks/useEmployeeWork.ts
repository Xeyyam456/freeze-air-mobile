import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchEmployeeWork } from "@shared/services/team.service";

// Ustanın bu ayki işləri (pəncərə açılanda yüklənir; canlı: tasks → employee-work)
function useEmployeeWork(employeeId: number, enabled = true) {
  return useQuery({ queryKey: queryKeys.employeeWork(employeeId), queryFn: () => fetchEmployeeWork(employeeId), enabled, refetchOnMount: "always" });
}

export default useEmployeeWork;
