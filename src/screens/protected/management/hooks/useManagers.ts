import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchManagers } from "@shared/services/team.service";
import { rank, sortManagers } from "@shared/utils/helpers/team";

// Rəhbərlik: müdir (varsa) ayrıca iri kartda, qalanlar vəzifə sırası ilə (web ManagerList ilə eyni). Nadir dəyişir: 10 dəq təzə
function useManagers() {
  const q = useQuery({ queryKey: queryKeys.managers, queryFn: fetchManagers, staleTime: 10 * 60_000 });
  const sorted = useMemo(() => sortManagers(q.data ?? []), [q.data]);
  const lead = sorted.length && rank(sorted[0].position) === 0 ? sorted[0] : null;
  const rest = lead ? sorted.slice(1) : sorted;
  return { lead, rest, loading: q.isPending, error: !!q.error && !q.data, reload: q.refetch };
}

export default useManagers;
