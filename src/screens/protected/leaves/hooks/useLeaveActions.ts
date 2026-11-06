import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { cancelLeave, giveUpLeave, submitLeave } from "@shared/services/leaves.service";
import { addDays, todayBaku } from "@shared/utils/time";
import { toast } from "@shared/utils/toast";
import type { MyLeave } from "@typings/leaves";

// Yazıdan sonra təzələnənlər: icazələr, davamiyyət (icazəli günlər), panel
const AFTER = ["my-leaves", "month-attendance", "employee-month", "my-today"];

// İcazə istə / Ehtiyac qalmadı / Geri götür — OPTİMİSTİK: siyahı klik anında dəyişir, baza arxada; xətada geri qayıdır
function useLeaveActions(me: number | undefined) {
  const qc = useQueryClient();

  const run = useCallback((change: (l: MyLeave[]) => MyLeave[], write: () => Promise<void>, ok: [string, string?]) => {
    if (!me) return;
    const key = queryKeys.myLeaves(me);
    void qc.cancelQueries({ queryKey: key });
    const prev = qc.getQueryData<MyLeave[]>(key);
    qc.setQueryData<MyLeave[]>(key, (l) => change(l ?? []));
    write()
      .then(() => toast.success(...ok))
      .catch((e: Error) => {
        qc.setQueryData(key, prev);
        toast.error(e.message);
      })
      .finally(() => AFTER.forEach((k) => qc.invalidateQueries({ queryKey: [k] })));
  }, [qc, me]);

  const submit = useCallback((from: string, to: string, reason: string) => {
    const temp: MyLeave = { id: -Date.now(), employee_id: me ?? 0, date_from: from, date_to: to, reason: reason.trim() || null,
      status: "pending", created_at: new Date().toISOString(), decided_at: null };
    run((l) => [temp, ...l], () => submitLeave(me!, from, to, reason), ["İcazə sorğusu göndərildi", "Təsdiqlənəndə bildiriş gələcək"]);
  }, [run, me]);

  // Başlamış icazədə keçmiş günlər icazəli qalır (bazada da belədir): bitmə tarixi dünən olur
  const giveUp = useCallback((l: MyLeave) => {
    const today = todayBaku();
    run((list) => list.map((x) => (x.id !== l.id ? x : l.date_from < today ? { ...x, date_to: addDays(today, -1) } : { ...x, status: "cancelled" })),
      () => giveUpLeave(l.id), ["İcazə ləğv edildi", "İşə gələ bilərsən"]);
  }, [run]);

  const cancel = useCallback((l: MyLeave) => {
    run((list) => list.filter((x) => x.id !== l.id), () => cancelLeave(l.id), ["Sorğu geri götürüldü"]);
  }, [run]);

  return { submit, giveUp, cancel };
}

export default useLeaveActions;
