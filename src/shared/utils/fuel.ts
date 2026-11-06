import { addDays } from "@shared/utils/time";
import { unpaidDays } from "@shared/utils/fuelDebt";
import type { DayCoverage, FuelListRow, FuelPayment, FuelPeriod, FuelRange, FuelTotals, MileageRow, StepKind } from "@typings/fuel";

// Yanacaq köməkçiləri (web views/Fuel/shared ilə eyni qaydalar)
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
export const FUEL_LABEL: Record<string, string> = { petrol: "Benzin", diesel: "Dizel" };
export const PERIOD_LABEL: Record<FuelPeriod, string> = { day: "Gün", week: "Həftə", month: "Ay" };
export const PERIOD_TOTAL: Record<FuelPeriod, string> = { day: "Günün yanacaq pulu", week: "Həftənin yanacaq pulu", month: "Ayın yanacaq pulu" };
export const WEEKDAY_SHORT = ["Baz", "B.e", "Ç.a", "Çər", "C.a", "Cüm", "Şən"];

export const azn = (n: number) => `${n.toFixed(2)} ₼`;
export const dayName = (iso: string) => `${Number(iso.slice(8))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
export const weekdayOf = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();
export const fmtKm = (n: number) => n.toLocaleString("az");
export function addMonths(iso: string, n: number) {
  const d = new Date(`${iso.slice(0, 7)}-01T12:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}

// Dövrün aralığı: gün; həftə = iş həftəsi (bazar ertəsi – şənbə); ay. workdays: dövrün iş günləri (bazarsız)
export function rangeOf(period: FuelPeriod, anchor: string): FuelRange {
  if (period === "day") return { from: anchor, to: anchor, label: dayName(anchor), workdays: 1 };
  if (period === "week") {
    const from = addDays(anchor, -((weekdayOf(anchor) + 6) % 7));
    const to = addDays(from, 5);
    const label = from.slice(5, 7) === to.slice(5, 7) ? `${Number(from.slice(8))}–${dayName(to)}` : `${dayName(from)} – ${dayName(to)}`;
    return { from, to, label, workdays: 6 };
  }
  const from = `${anchor.slice(0, 7)}-01`;
  const to = addDays(addMonths(from, 1), -1);
  let workdays = 0;
  for (let d = from; d <= to; d = addDays(d, 1)) if (weekdayOf(d) !== 0) workdays++;
  const m = MONTHS[Number(anchor.slice(5, 7)) - 1];
  return { from, to, label: `${m[0].toUpperCase()}${m.slice(1)} ${anchor.slice(0, 4)}`, workdays };
}

// Bağlanmış günlərin cəmi
export function sum(rows: MileageRow[]): FuelTotals {
  const closed = rows.filter((r) => r.km !== null);
  return {
    km: closed.reduce((n, r) => n + (r.km ?? 0), 0),
    liters: closed.reduce((n, r) => n + Number(r.liters ?? 0), 0),
    cost: closed.reduce((n, r) => n + Number(r.cost ?? 0), 0),
    days: closed.length,
  };
}

// Bazanın ingiliscə xətası → başa düşülən mətn
export function fuelError(msg: string, kind: StepKind) {
  if (/mileage_logs_check/.test(msg)) return kind === "start" ? "Səhər km axşam km-dən çox ola bilməz." : "Axşam km səhər km-dən az ola bilməz.";
  if (/mileage_logs_(start|end)_km_check/.test(msg)) return "Km mənfi ola bilməz.";
  if (/duplicate key/.test(msg)) return "Bu gün üçün qeyd artıq var, ekranı yenilə.";
  if (/row-level security|permission denied/.test(msg)) return "Bu əməliyyata icazən yoxdur.";
  return msg;
}

// FlashList sətirləri: "Verilməmiş pul" (ayın ödənilməmiş günləri), "Aldığım yanacaq pulu" + ödənişlər, "Günlük hesab" + günlər
export function buildFuelRows(rows: MileageRow[], payments: FuelPayment[], label: string, cov: Map<string, DayCoverage>, month: string): FuelListRow[] {
  const pending = payments.filter((p) => p.status === "pending").length;
  const unpaid = unpaidDays(cov);
  const out: FuelListRow[] = [];
  if (unpaid.length) out.push({ kind: "title", key: "t-unpaid", title: `Verilməmiş pul · ${month}`, badge: `${unpaid.length} gün` });
  unpaid.forEach((u) => out.push({ kind: "unpaid", key: `u${u.day}`, day: u.day, km: u.km, due: u.due, partial: u.covered > 0.005 }));
  out.push({ kind: "title", key: "t-pay", title: "Aldığım yanacaq pulu", badge: pending ? `${pending} təsdiq gözləyir` : undefined });
  if (!payments.length) out.push({ kind: "empty", key: "e-pay", text: "Bu dövrdə şirkət yanacaq pulu verməyib." });
  payments.forEach((p) => out.push({ kind: "payment", key: `p${p.id}`, payment: p }));
  out.push({ kind: "title", key: "t-day", title: `Günlük hesab · ${label}` });
  if (!rows.length) out.push({ kind: "empty", key: "e-day", text: "Bu dövrdə yürüş yazılmayıb." });
  const maxKm = Math.max(1, ...rows.map((r) => r.km ?? 0));
  rows.forEach((r) => out.push({ kind: "day", key: `d${r.id}`, row: r, maxKm, pay: cov.get(r.day),
    got: payments.filter((p) => p.day === r.day).reduce((n, p) => n + Number(p.amount), 0) }));
  return out;
}
