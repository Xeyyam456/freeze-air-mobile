import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchAttendanceEmployees, fetchMonthAttendance } from "@shared/services/attendanceMonth.service";
import { countToday } from "@shared/utils/helpers/attendanceView";
import type { AttendanceEmployee } from "@typings/attendance";

// Davamiyyət lövhəsi: ustalar + ayın xülasəsi (keşdən dərhal, canlı: usePanelLive), mən birinci, bu günün sayları
function useAttendanceBoard(month: string, me: number | undefined) {
  const emps = useQuery({ queryKey: queryKeys.attendanceEmployees, queryFn: fetchAttendanceEmployees });
  const att = useQuery({ queryKey: queryKeys.monthAttendance(month), queryFn: () => fetchMonthAttendance(month) });

  const rows = useMemo(() => {
    const list = emps.data ?? [];
    const mine = list.filter((e) => e.id === me);
    return [...mine, ...list.filter((e) => e.id !== me)];
  }, [emps.data, me]);

  const summaryOf = (e: AttendanceEmployee) => (att.data ? att.data.byEmployee[e.id] ?? att.data.empty : null);
  const totals = useMemo(() => countToday(rows.map((e) => (att.data ? att.data.byEmployee[e.id] ?? att.data.empty : null))
    .filter((x) => x !== null)), [rows, att.data]);

  return {
    rows,
    summaryOf,
    totals,
    ready: !!att.data,
    loading: emps.isPending,
    error: !!emps.error && !emps.data,
    reload: () => Promise.all([emps.refetch(), att.refetch()]),
  };
}

export default useAttendanceBoard;
