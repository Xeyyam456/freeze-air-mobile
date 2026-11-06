import { timeBaku } from "@shared/utils/time";
import type { MonthAttendance, Presence, TodayBadge, TodayTotals } from "@typings/attendance";

const MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
const WEEKDAYS = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];

// "Noyabr 2026"
export const monthTitle = (month: string) => `${MONTHS[+month.slice(5, 7) - 1]} ${month.slice(0, 4)}`;
// Ay sürüşdürmə: "2026-11", -1 → "2026-10"
export function shiftMonth(month: string, n: number) {
  const d = new Date(Date.UTC(+month.slice(0, 4), +month.slice(5, 7) - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}
// Ayın 1-i həftənin neçənci günüdür (bazar ertəsi = 0)
export const monthLead = (month: string) => (new Date(`${month}-01T12:00:00Z`).getUTCDay() + 6) % 7;
export const fullDate = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}`;
export const weekdayName = (d: string) => WEEKDAYS[new Date(`${d}T12:00:00Z`).getUTCDay()];
export const durationText = (p: Presence) => (p.minutes ? `${Math.floor(p.minutes / 60)} saat ${p.minutes % 60} dəq` : "");

// Ustaların bu günkü vəziyyətləri (yalnız cari ay)
export function countToday(list: MonthAttendance[]): TodayTotals {
  const t = { here: 0, done: 0, leave: 0, missing: 0, absent: 0, pending: 0 };
  for (const a of list) {
    t.pending += a.pendingLeave;
    if (a.today.status === "present" && a.today.presence?.out) t.done += 1;
    else if (a.today.status === "present") t.here += 1;
    else if (a.today.status === "leave") t.leave += 1;
    else if (a.today.status === "pending") t.missing += 1;
    else if (a.today.status === "absent") t.absent += 1;
  }
  return t;
}

// Bu günün nişanı (web todayBadge): bir neçə seans varsa qısa yazı, seanslar ayrıca siyahıda
export function todayBadge(a: MonthAttendance): TodayBadge {
  const p = a.today.presence;
  const multi = !!p && p.sessions.length > 1;
  const range = (x: Presence) => (x.out ? `${timeBaku(x.in)} – ${timeBaku(x.out)}` : `${timeBaku(x.in)}-dən`);
  switch (a.today.status) {
    case "present":
      return p?.out
        ? { text: `İşi bitirib · ${multi ? `${p.sessions.length} seans` : range(p)}`, tone: "ink" }
        : { text: `İşdədir · ${p ? (multi ? `${timeBaku(p.sessions[p.sessions.length - 1].in)}-dən` : range(p)) : ""}`, tone: "ok" };
    case "leave": return { text: "İcazəlidir", tone: "violet" };
    case "off": return { text: "Bazar: istirahət", tone: "muted" };
    case "absent": return { text: "İşdə olmayıb", tone: "danger" };
    default: return { text: "Hələ gəlməyib", tone: "muted" };
  }
}
