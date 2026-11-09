import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchMyLeaves } from "@shared/services/leaves.service";
import { buildLeaveRows, filterCounts, leaveStats } from "@shared/utils/helpers/leaves";
import { todayBaku } from "@shared/utils/helpers/time";
import type { LeaveFilter } from "@typings/leaves";

// İcazələrim: sorğular (keşdən dərhal, canlı: usePanelLive leave_requests → my-leaves), xülasə, süzgəc, sətirlər
function useMyLeaves() {
  const me = useMe().data?.employee?.id;
  const [today] = useState(todayBaku);
  const [filter, setFilter] = useState<LeaveFilter>("all");
  const q = useQuery({ queryKey: queryKeys.myLeaves(me ?? 0), queryFn: () => fetchMyLeaves(me!), enabled: !!me });

  const all = useMemo(() => q.data ?? [], [q.data]);
  const rows = useMemo(() => (q.data ? buildLeaveRows(all, today, filter) : []), [q.data, all, today, filter]);
  const stats = useMemo(() => leaveStats(all, today), [all, today]);
  const counts = useMemo(() => filterCounts(all, today), [all, today]);

  return {
    me,
    today,
    rows,
    stats,
    counts,
    filter,
    setFilter,
    loading: q.isPending && !!me,
    error: !!q.error && !q.data,
    reload: q.refetch,
  };
}

export default useMyLeaves;
