import { supabase } from "@shared/api/supabase";
import { dayStatus, monthDays, summarize, toPresence } from "@shared/utils/helpers/attendance";
import { todayBaku } from "@shared/utils/helpers/time";
import type { AttendanceEmployee, AttendanceRange, EmployeeMonth, MonthAttendance, MonthAttendanceData } from "@typings/attendance";

// Aralıq üçün gəlmələr, icazələr, "işdə olmayıb" qeydləri (API.md §7; employeeId verilsə yalnız o usta). 3 paralel sorğu
async function fetchRange(from: string, to: string, employeeId?: number): Promise<AttendanceRange> {
  let att = supabase.from("attendance").select("employee_id, day, checked_in_at, checked_out_at").gte("day", from).lte("day", to);
  let lv = supabase.from("leave_requests").select("id, employee_id, date_from, date_to, status").lte("date_from", to).gte("date_to", from);
  let ab = supabase.from("attendance_absences").select("employee_id, day").gte("day", from).lte("day", to);
  if (employeeId) {
    att = att.eq("employee_id", employeeId);
    lv = lv.eq("employee_id", employeeId);
    ab = ab.eq("employee_id", employeeId);
  }
  const [a, l, x] = await Promise.all([att, lv, ab]);
  const error = a.error ?? l.error ?? x.error;
  if (error) throw error;
  return { att: a.data ?? [], leaves: l.data ?? [], absences: x.data ?? [] };
}

// Davamiyyət cədvəlinin ustaları (aktiv, rəhbərlik yox)
export async function fetchAttendanceEmployees(): Promise<AttendanceEmployee[]> {
  const { data, error } = await supabase.from("employees").select("id, full_name, photo_url, specialty")
    .eq("is_management", false).eq("is_active", true).order("full_name");
  if (error) throw error;
  return data ?? [];
}

// Bütün ustaların ay üzrə xülasəsi: usta id → xülasə
export async function fetchMonthAttendance(month: string): Promise<MonthAttendanceData> {
  const days = monthDays(month);
  const { att, leaves, absences } = await fetchRange(days[0], days[days.length - 1]);
  const today = todayBaku();
  const ids = new Set([...att.map((a) => a.employee_id), ...leaves.map((l) => l.employee_id), ...absences.map((x) => x.employee_id)]);
  const byEmployee: Record<number, MonthAttendance> = {};
  for (const id of ids) {
    byEmployee[id] = summarize(month, today, toPresence(att.filter((a) => a.employee_id === id)),
      leaves.filter((l) => l.employee_id === id), new Set(absences.filter((x) => x.employee_id === id).map((x) => x.day)));
  }
  return { byEmployee, empty: summarize(month, today, new Map(), []) };
}

// Bir ustanın ayı (təqvim): gün → vəziyyət və saatlar
export async function fetchEmployeeMonth(employeeId: number, month: string): Promise<EmployeeMonth> {
  const days = monthDays(month);
  const { att, leaves, absences } = await fetchRange(days[0], days[days.length - 1], employeeId);
  const marked = new Set(absences.map((x) => x.day));
  const today = todayBaku();
  const presence = toPresence(att);
  return {
    summary: summarize(month, today, presence, leaves, marked),
    days: days.map((d) => ({ day: d, status: dayStatus(d, today, presence, leaves, marked), presence: presence.get(d) ?? null })),
  };
}
