import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { timeBaku } from "@shared/utils/time";
import { toast } from "@shared/utils/toast";
import { checkIn, checkOut, fetchToday, giveUpLeaveAndCheckIn } from "@shared/services/attendance.service";
import type { PresenceAction, TodayAttendance } from "@typings/panel";

type Action = PresenceAction;

// Optimistik: düymə basılan an ekran dəyişir ("İşdəsən · 09:41-dən"), baza arxada; xətada geri qayıdır
function optimistic(day: TodayAttendance | undefined, action: Action, at: string): TodayAttendance | undefined {
  if (!day) return day;
  if (action === "out") {
    const last = day.sessions[day.sessions.length - 1];
    if (!last || last.out) return day;
    return { ...day, sessions: [...day.sessions.slice(0, -1), { ...last, out: at }] };
  }
  return { status: "present", sessions: [...day.sessions, { in: at, out: null }], leaveId: null };
}

const DONE: Record<Action, string> = { in: "İşə gəldin", out: "İş günü bitdi", giveUpLeave: "İcazə ləğv edildi, işə gəldin" };

function useMyDay(employeeId: number) {
  const qc = useQueryClient();
  const key = queryKeys.today(employeeId);
  const query = useQuery({ queryKey: key, queryFn: () => fetchToday(employeeId) });

  const mutation = useMutation({
    mutationFn: async (action: Action) => {
      const day = qc.getQueryData<TodayAttendance>(key);
      const r = action === "out" ? await checkOut()
        : action === "giveUpLeave" && day?.leaveId ? await giveUpLeaveAndCheckIn(day.leaveId)
        : await checkIn();
      if (r.error) throw new Error(r.error);
      return { action, time: r.time };
    },
    onMutate: async (action) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<TodayAttendance>(key);
      qc.setQueryData(key, optimistic(prev, action, new Date().toISOString()));
      return { prev };
    },
    onError: (e, _a, ctx) => {
      qc.setQueryData(key, ctx?.prev);
      toast.error(e.message);
    },
    onSuccess: ({ action, time }) => toast.success(DONE[action], time ? `Saat: ${timeBaku(time)}` : undefined),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  return { day: query.data, busy: mutation.isPending, run: mutation.mutate };
}

export default useMyDay;
