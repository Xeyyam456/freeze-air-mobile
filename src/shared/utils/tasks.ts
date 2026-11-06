import type { DayTasks, PlaceKind, Task, TaskFiles, TaskListRow, WeekDay, WeekRow } from "@typings/tasks";

type PlaceRow = {
  place_text: string | null;
  stores: { name: string; code: string; companies: { name: string } | null } | null;
  companies: { name: string } | null;
};

// Yer: mağaza/filial (şirkət adı ilə) | sabit məkanlı şirkət | siyahıda olmayan yer | silinib
export function placeOf(t: PlaceRow): { place: string; placeKind: PlaceKind } {
  if (t.stores) return { place: `${t.stores.companies?.name ?? ""} · ${t.stores.code} ${t.stores.name}`, placeKind: "store" };
  if (t.companies) return { place: t.companies.name, placeKind: "company" };
  return { place: t.place_text ?? "Yer silinib", placeKind: "text" };
}

type FileRow = { id: number; group_id: string | null; work_logs: { work_files: { kind: string }[] } | null };

// Fayl sayı qrup üzrə: şəkil istənilən üzvün iş qeydinə yüklənə bilər, hər üzvün kartında görünsün
export function filesByGroup(rows: FileRow[]) {
  const by = new Map<string, TaskFiles>();
  for (const t of rows) {
    const k = t.group_id ?? `t${t.id}`;
    const f = by.get(k) ?? { act: 0, photo: 0, video: 0 };
    for (const w of t.work_logs?.work_files ?? []) if (w.kind === "act" || w.kind === "photo" || w.kind === "video") f[w.kind] += 1;
    by.set(k, f);
  }
  return by;
}

// Optimistik "görüldü": tapşırıq və qrupdursa bütün qrup (bazada da belədir)
export function flipDone(d: DayTasks, t: Pick<Task, "id" | "group_id">, done: boolean): DayTasks {
  const hit = (x: Task) => x.id === t.id || (!!t.group_id && x.group_id === t.group_id && !x.cancelled_at);
  return { ...d, tasks: d.tasks.map((x) => (hit(x) ? { ...x, done } : x)) };
}

// Həftənin hər günü: cəmi (qrup = 1 tapşırıq) və mənimkilər
export function weekDays(days: string[], rows: WeekRow[], me: number | undefined): WeekDay[] {
  return days.map((day) => {
    const list = rows.filter((r) => r.task_date === day);
    const groups = new Set(list.flatMap((r) => (r.group_id ? [r.group_id] : [])));
    const single = list.filter((r) => !r.group_id).length;
    return { day, total: single + groups.size, mine: list.filter((r) => r.employee_id === me).length };
  });
}

// FlashList sətirləri: "Mənim" başlığı + kartlar, sonra "Komanda" başlığı + hər usta bir kart
export function buildRows(data: DayTasks | undefined, me: number | undefined): TaskListRow[] {
  if (!data) return [];
  const mine = data.tasks.filter((t) => t.employee_id === me);
  const team = new Map<number, Task[]>();
  for (const t of data.tasks) {
    if (t.employee_id === me || t.cancelled_at) continue;
    team.set(t.employee_id, [...(team.get(t.employee_id) ?? []), t]);
  }
  const people = data.employees.filter((e) => team.has(e.id));
  const rows: TaskListRow[] = [{ kind: "title", key: "t-mine", title: "Mənim tapşırıqlarım", count: mine.length }];
  if (mine.length === 0) rows.push({ kind: "empty", key: "e-mine", text: "Bu gün sənə tapşırıq verilməyib." });
  for (const t of mine) {
    const mates = t.group_id
      ? data.tasks.filter((x) => x.group_id === t.group_id && x.id !== t.id && !x.cancelled_at)
        .flatMap((x) => data.employees.filter((e) => e.id === x.employee_id))
      : [];
    rows.push({ kind: "mine", key: `m${t.id}`, task: t, mates });
  }
  if (people.length) rows.push({ kind: "title", key: "t-team", title: "Komanda", count: people.length });
  for (const e of people) rows.push({ kind: "team", key: `e${e.id}`, employee: e, tasks: team.get(e.id)! });
  return rows;
}
