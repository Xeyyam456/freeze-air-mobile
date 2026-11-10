import { supabase } from "@shared/api/supabase";
import type { DayLog } from "@typings/panel";

// Günün işləri, hamı üzrə (API.md §3). Qrup tapşırığında hər üzvün öz iş qeydi var → bir sətirdə birləşdirilir.
export async function fetchDayLogs(day: string): Promise<DayLog[]> {
  const [logs, groups] = await Promise.all([
    supabase.from("work_logs")
      .select("id, created_at, description, place_text, employees(full_name, photo_url), stores(code, name, companies(name)), companies(name)")
      .eq("work_date", day).order("created_at", { ascending: false }),
    supabase.from("tasks").select("work_log_id, group_id, work_logs!inner(work_date)").eq("work_logs.work_date", day) // iş tarixi: task_date fərqli ola bilər
      .not("group_id", "is", null).not("work_log_id", "is", null),
  ]);
  if (logs.error) throw logs.error;
  const groupOf = new Map((groups.data ?? []).map((g) => [g.work_log_id as number, g.group_id as string]));
  const byKey = new Map<string, DayLog>();
  for (const l of logs.data ?? []) {
    const key = groupOf.get(l.id) ?? `l${l.id}`;
    const person = { name: l.employees?.full_name ?? "", photo: l.employees?.photo_url ?? null };
    const found = byKey.get(key);
    if (found) {
      found.people.push(person);
      continue;
    }
    const place = l.stores ? `${l.stores.companies?.name ?? ""} · ${l.stores.code} ${l.stores.name}`
      : l.companies?.name ?? l.place_text ?? "";
    byKey.set(key, { id: l.id, created_at: l.created_at, description: l.description, place, people: [person] });
  }
  return [...byKey.values()];
}
