import { supabase } from "@shared/api/supabase";
import { monthStartBaku } from "@shared/utils/time";
import type { Company, CompanyDetail, CompanyKind, PlaceWork, Unit } from "@typings/companies";

const COLS = "id, name, phone, address, contact_person, logo_url, lat, lng";

// Şirkətlər / marketlər siyahısı (API.md §11): filialların koordinatı da gəlir (say üçün)
export async function fetchCompanies(kind: CompanyKind): Promise<Company[]> {
  const { data, error } = await supabase.from("companies").select(`${COLS}, stores(lat, lng)`).eq("kind", kind).order("name");
  if (error) throw error;
  return (data ?? []) as Company[];
}

// Şirkət + filialları
export async function fetchCompanyDetail(id: number): Promise<CompanyDetail | null> {
  const [c, s] = await Promise.all([
    supabase.from("companies").select(`${COLS}, stores(lat, lng)`).eq("id", id).maybeSingle(),
    supabase.from("stores").select("id, code, name, address, phone, lat, lng").eq("company_id", id).order("code"),
  ]);
  if (c.error) throw c.error;
  if (s.error) throw s.error;
  return c.data ? { company: c.data as Company, units: (s.data ?? []) as Unit[] } : null;
}

async function paged<T>(build: (a: number, b: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>): Promise<T[]> {
  const all: T[] = [];
  for (let a = 0; ; a += 1000) {
    const { data, error } = await build(a, a + 999);
    if (error) throw new Error(error.message);
    all.push(...(data ?? []));
    if ((data?.length ?? 0) < 1000) return all;
  }
}

// Bu ay hər şirkətə görə iş sayı (şirkətə birbaşa və filiallarına yazılanlar). Qrup tapşırığı (0071) hər üzvə ayrıca iş qeydi yaradır, amma bir iş sayılır
export async function fetchMonthWorks(): Promise<Record<number, number>> {
  const from = monthStartBaku();
  const [logs, tasks] = await Promise.all([
    paged<{ id: number; company_id: number | null; s: { company_id: number } | null }>((a, b) =>
      supabase.from("work_logs").select("id, company_id, s:stores(company_id)").gte("work_date", from).order("id").range(a, b) as never),
    paged<{ work_log_id: number | null; group_id: string | null }>((a, b) =>
      supabase.from("tasks").select("work_log_id, group_id").not("group_id", "is", null).not("work_log_id", "is", null).gte("task_date", from).order("id").range(a, b)),
  ]);
  const group = new Map(tasks.map((x) => [x.work_log_id as number, x.group_id as string]));
  const seen = new Set<string>();
  const out: Record<number, number> = {};
  for (const l of logs) {
    const key = group.get(l.id) ?? `l${l.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const id = l.company_id ?? l.s?.company_id;
    if (id != null) out[id] = (out[id] ?? 0) + 1;
  }
  return out;
}

type Row = { id: number; work_date: string; created_at: string; description: string; employees: { full_name: string } | null; s?: { code: string; name: string } | null };
const WORK = "id, work_date, created_at, description, employees(full_name)";

// Yerin son işləri: birbaşa şirkətə yazılanlar + filiallarına yazılanlar (iki sorğu), qrup işi (eyni vaxt + mətn) bir sətirdə ustaların adları ilə
export async function fetchPlaceWork(id: number): Promise<PlaceWork[]> {
  const [d, v] = await Promise.all([
    supabase.from("work_logs").select(WORK).eq("company_id", id).order("created_at", { ascending: false }).limit(60),
    supabase.from("work_logs").select(`${WORK}, s:stores!inner(code, name, company_id)`).eq("s.company_id", id).order("created_at", { ascending: false }).limit(60),
  ]);
  if (d.error) throw d.error;
  if (v.error) throw v.error;
  const rows = [...((d.data ?? []) as unknown as Row[]), ...((v.data ?? []) as unknown as Row[])].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const out = new Map<string, PlaceWork>();
  for (const r of rows) {
    const key = `${r.created_at}|${r.description}`;
    const name = r.employees?.full_name ?? "";
    const found = out.get(key);
    if (found) { if (name && !found.names.includes(name)) found.names.push(name); continue; }
    out.set(key, { key, day: r.work_date, at: r.created_at, description: r.description, names: name ? [name] : [], unit: r.s ? `${r.s.code} ${r.s.name}` : null });
  }
  return [...out.values()].slice(0, 40);
}

// Usta yerin ünvanını/koordinatını düzəldir (0087, RPC place_set_location; hər dəyişiklik jurnala düşür)
export async function setPlaceLocation(args: { p_kind: string; p_id: number; p_lat?: number; p_lng?: number; p_address?: string; p_accuracy?: number }) {
  const { error } = await supabase.rpc("place_set_location", args);
  if (error) throw new Error(error.message);
}
