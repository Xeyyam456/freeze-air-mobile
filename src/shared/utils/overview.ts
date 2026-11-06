import { addDays, daysInMonth } from "@shared/utils/time";
import type { MonthOverview } from "@typings/panel";

export type OverviewRow = {
  work_date: string;
  place_text: string | null;
  stores: { code: string; name: string; companies: { name: string } | null } | null;
  companies: { name: string } | null;
};

const placeOf = (r: OverviewRow) =>
  r.stores ? `${r.stores.code} ${r.stores.name}` : r.companies?.name ?? r.place_text ?? "—";

// İş qeydlərindən dashboard icmalı: gün-gün saylar, son 7 gün, aktiv günlər, top 5 yer
export function buildOverview(rows: OverviewRow[], today: string, prevTotal: number): MonthOverview {
  const byDay = new Map<string, number>();
  for (const r of rows) byDay.set(r.work_date, (byDay.get(r.work_date) ?? 0) + 1);

  const monthPrefix = today.slice(0, 8);
  const month = Array.from({ length: daysInMonth(today) }, (_, i) => {
    const day = `${monthPrefix}${String(i + 1).padStart(2, "0")}`;
    return { day, count: byDay.get(day) ?? 0 };
  });
  const week = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(today, i - 6);
    return { day, count: byDay.get(day) ?? 0 };
  });

  const inMonth = rows.filter((r) => r.work_date.startsWith(monthPrefix));
  const places = new Map<string, number>();
  for (const r of inMonth) places.set(placeOf(r), (places.get(placeOf(r)) ?? 0) + 1);

  return {
    week,
    month,
    monthTotal: inMonth.length,
    prevTotal,
    activeDays: month.filter((d) => d.count > 0).length,
    places: [...places.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5),
  };
}
