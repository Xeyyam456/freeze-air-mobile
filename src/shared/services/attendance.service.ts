import { supabase } from "@shared/api/supabase";
import { isSunday, todayBaku } from "@shared/utils/time";
import type { DayStatus, TodayAttendance } from "@typings/panel";

// Bugünkü davamiyyətim (API.md §2): seanslar, təsdiqli icazə, "işdə olmayıb" qeydi → vəziyyət
export async function fetchToday(employeeId: number): Promise<TodayAttendance> {
  const today = todayBaku();
  const [att, leave, absence] = await Promise.all([
    supabase.from("attendance").select("checked_in_at, checked_out_at").eq("employee_id", employeeId).eq("day", today).order("checked_in_at"),
    supabase.from("leave_requests").select("id").eq("employee_id", employeeId).eq("status", "approved")
      .lte("date_from", today).gte("date_to", today).limit(1).maybeSingle(),
    supabase.from("attendance_absences").select("id").eq("employee_id", employeeId).eq("day", today).limit(1).maybeSingle(),
  ]);
  if (att.error) throw att.error;
  const sessions = (att.data ?? []).map((a) => ({ in: a.checked_in_at, out: a.checked_out_at }));
  const status: DayStatus = absence.data ? "absent"
    : sessions.length ? "present"
    : leave.data ? "leave"
    : isSunday(today) ? "sunday"
    : "pending";
  return { status, sessions, leaveId: leave.data?.id ?? null };
}

type Result = { time: string | null; error: string | null };

export async function checkIn(): Promise<Result> {
  const { data, error } = await supabase.rpc("check_in");
  return { time: data ?? null, error: error?.message ?? null };
}

export async function checkOut(): Promise<Result> {
  const { data, error } = await supabase.rpc("check_out");
  return { time: data ?? null, error: error?.message ?? null };
}

// İcazəli gündə "İcazəyə ehtiyac qalmadı, işdəyəm": icazə ləğv olunur, sonra işə gəlmə yazılır
export async function giveUpLeaveAndCheckIn(leaveId: number): Promise<Result> {
  const { error } = await supabase.rpc("leave_cancel", { p_id: leaveId });
  return error ? { time: null, error: error.message } : checkIn();
}
