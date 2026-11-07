import { supabase } from "@shared/api/supabase";
import { buildStatus, countWork } from "@shared/utils/team";
import { isSunday, monthStartBaku, todayBaku } from "@shared/utils/time";
import type { EmployeesData, Person, WorkEntry } from "@typings/team";

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

// Ustanın bu ayki iş qeydləri (harada, nə iş): yeni üstdə. Digər ustaların qeydlərini də oxumaq olar (API.md §3)
export async function fetchEmployeeWork(employeeId: number): Promise<WorkEntry[]> {
  const { data, error } = await supabase.from("work_logs")
    .select("id, work_date, created_at, description, place_text, stores(code, name, companies(name)), companies(name), work_files(id)")
    .eq("employee_id", employeeId).gte("work_date", monthStartBaku()).order("work_date", { ascending: false }).order("created_at", { ascending: false }).limit(500);
  if (error) throw error;
  return (data ?? []).map((l) => ({
    id: l.id,
    work_date: l.work_date,
    created_at: l.created_at,
    description: l.description,
    place: l.stores ? `${l.stores.code} ${l.stores.name}` : l.companies?.name ?? l.place_text ?? "Yer yazılmayıb",
    company: l.stores?.companies?.name ?? null,
    files: l.work_files?.length ?? 0,
  }));
}
