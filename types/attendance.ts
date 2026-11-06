// Davamiyyət bölməsi tipləri (API.md §7; web types/attendance ilə eyni məna)
import type { Session } from "@typings/panel";

export type AttRow = { employee_id: number; day: string; checked_in_at: string; checked_out_at: string | null };
export type Leave = { id: number; employee_id: number; date_from: string; date_to: string; status: string };
export type Absence = { employee_id: number; day: string };
export type AttendanceRange = { att: AttRow[]; leaves: Leave[]; absences: Absence[] };

// Bir günün iştirakı: ilk gəlmə, son getmə (açıq seans varsa null), seanslar, bağlanmış seansların dəqiqəsi
export type Presence = { in: string; out: string | null; sessions: Session[]; minutes: number };

export type DayStatus = "present" | "leave" | "absent" | "pending" | "off" | "future" | "before";
export type DayEntry = { day: string; status: DayStatus; presence: Presence | null };

// Ayın xülasəsi (bir usta)
export type MonthAttendance = {
  workdays: number;
  present: number;
  leave: number; // icazəli iş günləri
  absent: number;
  leaveTimes: number; // ayda neçə dəfə icazə alıb
  extra: number; // bazar günü işə çıxıb
  today: { status: DayStatus; presence: Presence | null };
  pendingLeave: number;
};

// Bütün ustalar: id → xülasə. Map yox, obyekt: TanStack keşi MMKV-də JSON kimi saxlanır
export type MonthAttendanceData = { byEmployee: Record<number, MonthAttendance>; empty: MonthAttendance };

export type AttendanceEmployee = { id: number; full_name: string; photo_url: string | null; specialty: string | null };
export type EmployeeMonth = { summary: MonthAttendance; days: DayEntry[] };

export type TodayTotals = { here: number; done: number; leave: number; missing: number; absent: number; pending: number };
export type TodayBadge = { text: string; tone: "ok" | "ink" | "violet" | "muted" | "danger" };
