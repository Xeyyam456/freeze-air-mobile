import type { PresenceAction, TodayAttendance } from "@typings/panel";

// Optimistik vəziyyət: düymə basılan an ekranda nəticə (baza cavabı gözlənilmir).
// İşə gəldim / yenidən işə çıxdım / icazədən imtina: yeni açıq seans; işi bitirdim: açıq seans bağlanır.
export function optimisticDay(day: TodayAttendance | undefined, action: PresenceAction, at: string): TodayAttendance | undefined {
  if (!day) return day;
  if (action === "out") {
    const last = day.sessions[day.sessions.length - 1];
    if (!last || last.out) return day;
    return { ...day, sessions: [...day.sessions.slice(0, -1), { ...last, out: at }] };
  }
  return { status: "present", sessions: [...day.sessions, { in: at, out: null }], leaveId: null };
}
