import { supabase } from "@shared/api/supabase";
import { filesByGroup, placeOf } from "@shared/utils/helpers/tasks";
import type { DayTasks, WeekRow } from "@typings/tasks";

// Tək literal olmalıdır: supabase-js tipi sətirdən çıxarır (birləşdirmə tipi itirir)
const TASK_SELECT = "id, employee_id, group_id, reason, done, note, work_log_id, place_text, cancelled_at, reassigned_to, stores(name, code, companies(name)), companies(name), work_logs(work_files(kind))" as const;

// Günün bütün tapşırıqları + aktiv ustalar (API.md §4; web fetchMyTasks ilə eyni). Ekran başına 2 sorğu (+ nadir "kimə verilib").
export async function fetchDayTasks(day: string): Promise<DayTasks> {
  const [tasks, employees] = await Promise.all([
    supabase.from("tasks").select(TASK_SELECT).eq("task_date", day).order("created_at"),
    supabase.from("employees").select("id, full_name, photo_url").eq("is_management", false).eq("is_active", true).order("full_name"),
  ]);
  if (tasks.error) throw tasks.error;
  if (employees.error) throw employees.error;
  const rows = tasks.data ?? [];

  // Geri alınıb başqasına verilənlər: yeni tapşırıq kimdədir ("Geri alınıb → Ad")
  const nextIds = rows.flatMap((t) => (t.reassigned_to ? [t.reassigned_to] : []));
  const nextName = new Map<number, string>();
  if (nextIds.length) {
    const { data } = await supabase.from("tasks").select("id, employees(full_name)").in("id", nextIds);
    for (const n of data ?? []) if (n.employees) nextName.set(n.id, n.employees.full_name);
  }

  const files = filesByGroup(rows);
  return {
    tasks: rows.map((t) => ({
      id: t.id,
      employee_id: t.employee_id,
      group_id: t.group_id,
      reason: t.reason,
      done: t.done,
      note: t.note,
      work_log_id: t.work_log_id,
      cancelled_at: t.cancelled_at,
      ...placeOf(t),
      files: files.get(t.group_id ?? `t${t.id}`)!,
      nextName: t.reassigned_to ? nextName.get(t.reassigned_to) : undefined,
    })),
    employees: employees.data ?? [],
  };
}

// Həftə zolağı: hər gün neçə tapşırıq (geri alınanlar sayılmır)
export async function fetchWeek(from: string, to: string): Promise<WeekRow[]> {
  const { data, error } = await supabase.from("tasks").select("task_date, employee_id, group_id")
    .gte("task_date", from).lte("task_date", to).is("cancelled_at", null);
  if (error) throw error;
  return data ?? [];
}

// Görüldü / geri: iş qeydi bazada avtomatik yaranır (qrupda hər üzvə öz qeydi), geri alanda boş qeyd silinir
export async function setTaskDone(id: number, done: boolean) {
  const { error } = await supabase.rpc("task_set_done", { p_task_id: id, p_done: done });
  if (error) throw new Error(error.message);
}
