import { supabase } from "@shared/api/supabase";
import { buildPartners, buildStatus, countWork } from "@shared/utils/helpers/team";
import { isSunday, monthStartBaku, todayBaku } from "@shared/utils/helpers/time";
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
  const [emp, att, leave, logs, grp] = await Promise.all([
    supabase.from("employees").select(COLS).eq("is_management", false).eq("is_active", true).order("full_name"),
    supabase.from("attendance").select("employee_id, checked_in_at, checked_out_at").eq("day", today),
    supabase.from("leave_requests").select("employee_id").eq("status", "approved").lte("date_from", today).gte("date_to", today),
    monthLogs(monthStartBaku()),
    supabase.from("tasks").select("employee_id, group_id").eq("task_date", today).is("cancelled_at", null).not("group_id", "is", null),
  ]);
  if (emp.error) throw emp.error;
  const people = emp.data ?? [];
  const { day, month } = countWork(logs, today);
  return { people, status: buildStatus(people, att.data ?? [], leave.data ?? [], isSunday(today)), today: day, month, partner: buildPartners(people, (grp.data ?? []) as { employee_id: number; group_id: string }[]) };
}

// Rəhbərlik: aktiv rəhbərlər
export async function fetchManagers(): Promise<Person[]> {
  const { data, error } = await supabase.from("employees").select(COLS).eq("is_management", true).eq("is_active", true).order("full_name");
  if (error) throw error;
  return data ?? [];
}

// Ustanın bu ayki iş qeydləri (harada, nə iş): yeni üstdə. Digər ustaların qeydlərini də oxumaq olar (API.md §3).
// Qrup tapşırığında faylı bir üzv yükləyir, digərlərinin öz qeydində fayl olmur → qrupun bütün qeydlərinin faylları birləşdirilir
export async function fetchEmployeeWork(employeeId: number): Promise<WorkEntry[]> {
  const { data, error } = await supabase.from("work_logs")
    .select("id, work_date, created_at, description, place_text, stores(code, name, companies(name)), companies(name)")
    .eq("employee_id", employeeId).gte("work_date", monthStartBaku()).order("work_date", { ascending: false }).order("created_at", { ascending: false }).limit(500);
  if (error) throw error;
  const logs = data ?? [];
  const ids = logs.map((l) => l.id);
  const mine = ids.length ? (await supabase.from("tasks").select("work_log_id, group_id").in("work_log_id", ids).not("group_id", "is", null)).data ?? [] : [];
  const groupOf = new Map(mine.map((t) => [t.work_log_id as number, t.group_id as string]));
  const groups = [...new Set(groupOf.values())];
  const members = groups.length ? (await supabase.from("tasks").select("work_log_id, group_id").in("group_id", groups).is("cancelled_at", null).not("work_log_id", "is", null)).data ?? [] : [];
  const logsOf = new Map<string, number[]>();
  for (const m of members) logsOf.set(m.group_id as string, [...(logsOf.get(m.group_id as string) ?? []), m.work_log_id as number]);
  const allIds = [...new Set([...ids, ...members.map((m) => m.work_log_id as number)])];
  const fileRows = allIds.length ? (await supabase.from("work_files").select("work_log_id").in("work_log_id", allIds)).data ?? [] : [];
  const count = new Map<number, number>();
  for (const f of fileRows) count.set(f.work_log_id, (count.get(f.work_log_id) ?? 0) + 1);

  return logs.map((l) => {
    const g = groupOf.get(l.id);
    const logIds = [...new Set([l.id, ...(g ? logsOf.get(g) ?? [] : [])])];
    return {
      id: l.id,
      logIds,
      work_date: l.work_date,
      created_at: l.created_at,
      description: l.description,
      place: l.stores ? `${l.stores.code} ${l.stores.name}` : l.companies?.name ?? l.place_text ?? "Yer yazılmayıb",
      company: l.stores?.companies?.name ?? null,
      files: logIds.reduce((n, id) => n + (count.get(id) ?? 0), 0),
    };
  });
}
