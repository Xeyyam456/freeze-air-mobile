import { addDays } from "@shared/utils/time";
import type { LeaveFilter, LeaveRow, LeaveStats, MyLeave } from "@typings/leaves";

const MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
type Range = { date_from: string; date_to: string };

// İcazənin iş günləri (bazar sayılmır)
export function leaveWorkdays({ date_from, date_to }: Range) {
  let n = 0;
  for (let d = date_from; d <= date_to; d = addDays(d, 1)) if (new Date(`${d}T12:00:00Z`).getUTCDay() !== 0) n += 1;
  return n;
}

// "21.10.2026" / "21.10.2026 – 23.10.2026" (il həmişə hər iki tarixdə)
export function leaveRange({ date_from, date_to }: Range) {
  const f = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}`;
  return date_from === date_to ? f(date_from) : `${f(date_from)} – ${f(date_to)}`;
}

// "21.10.2026 18:41" (Bakı vaxtı, UTC+4)
export const stamp = (iso: string) => {
  const d = new Date(Date.parse(iso) + 4 * 3600_000).toISOString();
  return `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)} ${d.slice(11, 16)}`;
};

// Aktiv: gözləyən və ya hələ bitməmiş təsdiqli; qalanı tarixçə
export const isActive = (l: MyLeave, today: string) => l.status === "pending" || (l.status === "approved" && l.date_to >= today);

// Dövrə (il "YYYY" / ay "YYYY-MM") düşən təsdiqli icazə iş günləri
function daysIn(approved: MyLeave[], prefix: string) {
  const yearly = prefix.length === 4;
  return approved.reduce((n, l) => {
    const from = l.date_from.startsWith(prefix) ? l.date_from : l.date_from < prefix ? `${prefix}${yearly ? "-01-01" : "-01"}` : null;
    const to = l.date_to.startsWith(prefix) ? l.date_to : l.date_to > prefix ? `${prefix}${yearly ? "-12-31" : "-31"}` : null;
    return from && to && from <= to ? n + leaveWorkdays({ date_from: from, date_to: to }) : n;
  }, 0);
}

export function leaveStats(all: MyLeave[], today: string): LeaveStats {
  const approved = all.filter((l) => l.status === "approved");
  return {
    year: daysIn(approved, today.slice(0, 4)),
    month: daysIn(approved, today.slice(0, 7)),
    pending: all.filter((l) => l.status === "pending").length,
    next: approved.filter((l) => l.date_from > today).sort((a, b) => a.date_from.localeCompare(b.date_from))[0] ?? null,
  };
}

// FlashList sətirləri: "Aktiv və gözləyən" + kartlar, "Tarixçə" + süzgəc + aylara görə kartlar
export function buildLeaveRows(all: MyLeave[], today: string, filter: LeaveFilter): LeaveRow[] {
  const active = all.filter((l) => isActive(l, today)).sort((a, b) => a.date_from.localeCompare(b.date_from));
  const past = all.filter((l) => !isActive(l, today));
  const shown = filter === "all" ? past : past.filter((l) => l.status === filter);
  const rows: LeaveRow[] = [{ kind: "title", key: "t-active", title: "Aktiv və gözləyən" }];
  if (!active.length) rows.push({ kind: "empty", key: "e-active", text: "İndi aktiv və ya gözləyən icazən yoxdur." });
  active.forEach((l) => rows.push({ kind: "leave", key: `a${l.id}`, leave: l, active: true }));
  rows.push({ kind: "title", key: "t-past", title: "Tarixçə" }, { kind: "filters", key: "filters" });
  if (!shown.length) rows.push({ kind: "empty", key: "e-past", text: past.length ? "Bu süzgəcə uyğun sorğu yoxdur." : "Hələ keçmiş icazən yoxdur." });
  let month = "";
  for (const l of shown) {
    const m = l.date_from.slice(0, 7);
    if (m !== month) rows.push({ kind: "month", key: `m${m}`, label: `${MONTHS[+m.slice(5, 7) - 1]} ${m.slice(0, 4)}` });
    month = m;
    rows.push({ kind: "leave", key: `p${l.id}`, leave: l, active: false });
  }
  return rows;
}

// Süzgəc çiplərinin sayları (yalnız tarixçə)
export function filterCounts(all: MyLeave[], today: string): Record<LeaveFilter, number> {
  const past = all.filter((l) => !isActive(l, today));
  const by = (s: string) => past.filter((l) => l.status === s).length;
  return { all: past.length, approved: by("approved"), rejected: by("rejected"), cancelled: by("cancelled") };
}
