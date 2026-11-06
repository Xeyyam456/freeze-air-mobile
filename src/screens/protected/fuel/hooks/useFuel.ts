import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchMyFuel } from "@shared/services/fuel.service";
import { addMonths, buildFuelRows, FUEL_LABEL, rangeOf, sum } from "@shared/utils/fuel";
import { addDays, todayBaku } from "@shared/utils/time";
import type { FuelPeriod } from "@typings/fuel";

// Yanacaq ekranının vəziyyəti: dövr (gün/həftə/ay) və tarixi, məlumat (keşdən dərhal; canlı: mileage_logs, fuel_payments),
// hesablanan yekunlar. Bu günün sətri dövrdən asılı deyil; balans həmişə seçilmiş dövrün ayına görə
function useFuel() {
  const me = useMe().data?.employee?.id;
  const [today] = useState(todayBaku);
  const [period, setPeriod] = useState<FuelPeriod>("day");
  const [anchor, setAnchor] = useState(today);
  const range = rangeOf(period, anchor);
  const monthR = rangeOf("month", anchor);
  const key = queryKeys.myFuel(me ?? 0, range.from, range.to);
  const q = useQuery({
    queryKey: key,
    queryFn: () => fetchMyFuel(me!, range.from, range.to, today, monthR.from, monthR.to),
    enabled: !!me,
    placeholderData: (prev) => prev, // dövr dəyişəndə köhnə rəqəmlər yenisi gələnə qədər qalır
  });
  const d = q.data;
  const car = d?.car ?? null;
  const price = car?.fuel_type === "diesel" ? d?.prices.diesel ?? null : car?.fuel_type === "petrol" ? d?.prices.petrol ?? null : null;
  const total = useMemo(() => sum(d?.rows ?? []), [d?.rows]);
  const list = useMemo(() => (d ? buildFuelRows(d.rows, d.payments, range.label) : []), [d, range.label]);
  const month = d?.month ?? { cost: 0, paid: 0 };

  const shift = (dir: 1 | -1) => setAnchor((x) => {
    const next = period === "day" ? addDays(x, dir) : period === "week" ? addDays(x, 7 * dir) : addMonths(x, dir);
    return next > today ? today : next;
  });

  return {
    me, key, today, period, range, monthR, data: d, car, price, total, list, month,
    fuelName: car?.fuel_type ? FUEL_LABEL[car.fuel_type] ?? null : null,
    todayRow: d?.today ?? null,
    balance: month.paid - month.cost,
    atEnd: range.to >= today,
    shift,
    choosePeriod: (p: FuelPeriod) => { setPeriod(p); setAnchor(today); },
    loading: q.isPending && !!me,
    error: !!q.error && !d,
    reload: q.refetch,
  };
}

export type FuelState = ReturnType<typeof useFuel>;
export default useFuel;
