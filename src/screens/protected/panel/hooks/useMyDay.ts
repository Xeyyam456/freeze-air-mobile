import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { checkIn, checkOut, fetchToday, giveUpLeaveAndCheckIn } from "@shared/services/attendance.service";
import { optimisticDay } from "@shared/utils/helpers/optimistic";
import { timeBaku } from "@shared/utils/helpers/time";
import { toast } from "@shared/utils/helpers/toast";
import type { PresenceAction, TodayAttendance } from "@typings/panel";

type Vars = { action: PresenceAction; prev: TodayAttendance | undefined };

const DONE: Record<PresenceAction, string> = { in: "İşə gəldin", out: "İş günü bitdi", giveUpLeave: "İcazə ləğv edildi, işə gəldin" };

// Mənim bugünüm. OPTİMİSTİK: klik anında keş sinxron dəyişir (ekran dərhal), baza arxada; xətada geri qayıdır.
// Spinner yoxdur: istifadəçi nəticəni dərhal görür (qayda: mobile/CLAUDE.md → Sürət qaydaları).
function useMyDay(employeeId: number) {
  const qc = useQueryClient();
  const key = queryKeys.today(employeeId);
  const query = useQuery({ queryKey: key, queryFn: () => fetchToday(employeeId) });

  const mutation = useMutation({
    mutationFn: async ({ action, prev }: Vars) => {
      const r = action === "out" ? await checkOut()
        : action === "giveUpLeave" && prev?.leaveId ? await giveUpLeaveAndCheckIn(prev.leaveId)
        : await checkIn();
      if (r.error) throw new Error(r.error);
      return r.time;
    },
    onError: (e, { prev }) => {
      qc.setQueryData(key, prev);
      toast.error(e.message);
    },
    onSuccess: (time, { action }) => toast.success(DONE[action], time ? `Saat: ${timeBaku(time)}` : undefined),
    // Bazadan təzə vəziyyət (dəqiq saat); optimistik vəziyyət onunla əvəzlənir
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  function run(action: PresenceAction) {
    if (mutation.isPending) return; // əvvəlki yazı bitmədən ikinci əməliyyat yox
    const prev = qc.getQueryData<TodayAttendance>(key);
    void qc.cancelQueries({ queryKey: key }); // gələn köhnə cavab optimistik vəziyyəti əzməsin
    qc.setQueryData(key, optimisticDay(prev, action, new Date().toISOString()));
    mutation.mutate({ action, prev });
  }

  return { day: query.data, pending: mutation.isPending, run };
}

export default useMyDay;
