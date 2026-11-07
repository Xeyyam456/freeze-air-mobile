import { supabase } from "@shared/api/supabase";
import { buildStatus, countWork } from "@shared/utils/team";
import { isSunday, monthStartBaku, todayBaku } from "@shared/utils/time";
import type { EmployeesData, Person } from "@typings/team";

const COLS = "id, full_name, photo_url, position, specialty, phone, start_date, has_car, car_plate, car_model";

// Bu ayın işləri (ayda 1000-dən çox ola bilər: 1000-lik hissələrlə)
async function monthLogs(from: string) {
  const all: { employee_id: number; work_date: string }[] = [];
  for (let a = 0; ; a += 1000) {
    const { data, error } = await supabase.from("work_logs").select("id, employee_id, work_date").gte("work_date", from).order("id").range(a, a + 999);
    if (error) throw error;
    all.push(...(data ?? []));
    if ((data?.length ?? 0) < 1000) return all;
  }
}

// Ustalar (API.md §11): aktiv ustalar + bu günün davamiyyəti, icazələri, bu gün/ay iş sayı
export async function fetchEmployees(): Promise<EmployeesData> {
  const today = todayBaku();
  const [emp, att, leave, logs] = await Promise.all([
    supabase.from("employees").select(COLS).eq("is_management", false).eq("is_active", true).order("full_name"),
    supabase.from("attendance").select("employee_id, checked_in_at, checked_out_at").eq("day", today),
    supabase.from("leave_requests").select("employee_id").eq("status", "approved").lte("date_from", today).gte("date_to", today),
    monthLogs(monthStartBaku()),
  ]);
  if (emp.error) throw emp.error;
  const people = emp.data ?? [];
  const { day, month } = countWork(logs, today);
  return { people, status: buildStatus(people, att.data ?? [], leave.data ?? [], isSunday(today)), today: day, month };
}

// Rəhbərlik: aktiv rəhbərlər
export async function fetchManagers(): Promise<Person[]> {
  const { data, error } = await supabase.from("employees").select(COLS).eq("is_management", true).eq("is_active", true).order("full_name");
  if (error) throw error;
  return data ?? [];
}
