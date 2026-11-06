import { addDays, daysInMonth } from "@shared/utils/time";
import type { AttRow, DayStatus, Leave, MonthAttendance, Presence } from "@typings/attendance";

// Davamiyyət qaydaları (web shared/utils/attendance ilə EYNİ — rəqəmlər iki yerdə fərqli çıxmasın):
// iş həftəsi 6 gün, bazar iş günü deyil (çağırılıb gəlibsə "əlavə"); təsdiqlənmiş icazə işdə olmaqdan üstündür.
// Davamiyyət 2026-10-01-dən aparılır: əvvəlki günlər "gəlmədi" sayılmır.
export const ATTENDANCE_START = "2026-10-01";

export const isWorkday = (d: string) => new Date(`${d}T12:00:00Z`).getUTCDay() !== 0;

// "2026-11" → ayın bütün günləri
export function monthDays(month: string) {
  const first = `${month}-01`;
  return Array.from({ length: daysInMonth(first) }, (_, i) => addDays(first, i));
}

// Gündə bir neçə seans: in = ilk gəlmə, out = son getmə (açıq seans varsa null), minutes = bağlanmış seansların cəmi
export function toPresence(rows: AttRow[]) {
  const map = new Map<string, Presence>();
  for (const a of [...rows].sort((x, y) => x.checked_in_at.localeCompare(y.checked_in_at))) {
    const p = map.get(a.day) ?? { in: a.checked_in_at, out: null, sessions: [], minutes: 0 };
    p.sessions.push({ in: a.checked_in_at, out: a.checked_out_at });
    if (a.checked_out_at) p.minutes += Math.max(0, Math.round((Date.parse(a.checked_out_at) - Date.parse(a.checked_in_at)) / 60000));
    p.out = p.sessions.every((s) => s.out) ? a.checked_out_at : null;
    map.set(a.day, p);
  }
  return map;
}

// Bir günün vəziyyəti. marked: admin "işdə olmayıb" qeyd etdiyi günlər
export function dayStatus(d: string, today: string, presence: Map<string, Presence>, leaves: Leave[], marked: Set<string>): DayStatus {
  const onLeave = leaves.some((l) => l.status === "approved" && l.date_from <= d && d <= l.date_to);
  if (!isWorkday(d)) return presence.has(d) ? "present" : "off";
  if (d > today) return onLeave ? "leave" : "future";
  if (onLeave) return "leave";
  if (presence.has(d)) return "present";
  if (marked.has(d)) return "absent";
  if (d < ATTENDANCE_START) return "before";
  return d < today ? "absent" : "pending";
}

// Ayın xülasəsi: iş günü, işdə, icazəli, gəlmədi, bazar işi, bu gün
export function summarize(month: string, today: string, presence: Map<string, Presence>, leaves: Leave[], marked = new Set<string>()): MonthAttendance {
  const r: MonthAttendance = { workdays: 0, present: 0, leave: 0, absent: 0, leaveTimes: 0, extra: 0,
    today: { status: "future", presence: null }, pendingLeave: leaves.filter((l) => l.status === "pending").length };
  const days = monthDays(month);
  for (const d of days) {
    const st = dayStatus(d, today, presence, leaves, marked);
    if (d > today || st === "off" || st === "before") continue;
    if (!isWorkday(d)) {
      r.extra += 1;
      continue;
    }
    r.workdays += 1;
    if (st === "present") r.present += 1;
    else if (st === "leave") r.leave += 1;
    else if (st === "absent") r.absent += 1;
  }
  const [first, last] = [days[0], days[days.length - 1]];
  r.leaveTimes = leaves.filter((l) => l.status === "approved" && l.date_from <= last && l.date_to >= first).length;
  if (today.startsWith(month)) r.today = { status: dayStatus(today, today, presence, leaves, marked), presence: presence.get(today) ?? null };
  return r;
}
