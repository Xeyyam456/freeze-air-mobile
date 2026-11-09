import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { confirmPayment, saveMileage, uploadMileagePhoto } from "@shared/services/fuel.service";
import { fuelError } from "@shared/utils/helpers/fuel";
import { toast } from "@shared/utils/helpers/toast";
import type { FuelData, MileageRow, StepKind } from "@typings/fuel";
import type { FuelState } from "@screens/protected/fuel/hooks/useFuel";

const AFTER = ["my-fuel"];

// Səhər/axşam km və "Aldım/Almadım" — OPTİMİSTİK: km (yerli şəkillə) və ödəniş vəziyyəti klik anında dəyişir;
// şəkil sıxılıb yüklənir və baza arxada yazılır (km/litr/məbləğ bazada hesablanır, sonra təzələnir). Xətada geri qayıdır
function useFuelActions(f: Pick<FuelState, "me" | "key" | "today" | "todayRow">) {
  const qc = useQueryClient();
  const { me, key, today, todayRow } = f;

  const patch = useCallback((change: (d: FuelData) => FuelData) => {
    void qc.cancelQueries({ queryKey: key });
    const prev = qc.getQueryData<FuelData>(key);
    qc.setQueryData<FuelData>(key, (d) => d && change(d));
    return () => qc.setQueryData(key, prev);
  }, [qc, key]);

  const save = useCallback((kind: StepKind, km: number, photoUri: string | null) => {
    if (!me) return;
    const now = new Date().toISOString();
    const local: MileageRow = todayRow
      ? { ...todayRow, ...(kind === "start" ? { start_km: km, start_photo: photoUri ?? todayRow.start_photo } : { end_km: km, end_photo: photoUri ?? todayRow.end_photo, end_at: now }) }
      : { id: -1, employee_id: me, day: today, start_km: km, start_photo: photoUri, start_at: now, end_km: null, end_photo: null, end_at: null,
        km: null, liters: null, cost: null, fuel_per_100: null, fuel_price: null, fuel_type: null, created_at: now };
    const undo = patch((d) => ({ ...d, today: local }));
    (async () => {
      const path = photoUri ? await uploadMileagePhoto(me, today, kind, photoUri) : null;
      await saveMileage(me, kind, km, path, todayRow?.id ?? null);
    })()
      .then(() => toast.success(kind === "start" ? "Səhər km-i yazıldı" : "Axşam km-i yazıldı, gün hesablandı"))
      .catch((e: Error) => { undo(); toast.error(fuelError(e.message, kind)); })
      .finally(() => AFTER.forEach((k) => qc.invalidateQueries({ queryKey: [k] })));
  }, [me, today, todayRow, patch, qc]);

  const confirm = useCallback((id: number, received: boolean) => {
    const undo = patch((d) => ({ ...d, payments: d.payments.map((p) => (p.id === id ? { ...p, status: received ? "received" : "disputed" } : p)) }));
    confirmPayment(id, received)
      .then(() => toast.success(received ? "Təsdiqlədin: pulu aldın" : "Bildirdin: pulu almamısan", received ? undefined : "Admin görəcək"))
      .catch((e: Error) => { undo(); toast.error(e.message); })
      .finally(() => AFTER.forEach((k) => qc.invalidateQueries({ queryKey: [k] })));
  }, [patch, qc]);

  return { save, confirm };
}

export default useFuelActions;
