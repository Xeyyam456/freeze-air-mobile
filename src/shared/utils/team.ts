import { timeBaku } from "@shared/utils/time";
import type { Person, PersonStatus } from "@typings/team";

// Təcrübə: "2 il 3 ay" / "1 aydan az" (web lib/experience ilə eyni)
export function experience(startDate: string | null, now = new Date()): string | null {
  if (!startDate) return null;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime()) || start > now) return null;
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0 && rest === 0) return "1 aydan az";
  return [years && `${years} il`, rest && `${rest} ay`].filter(Boolean).join(" ");
}

// "2026-11-07" → "07.11.2026"
export const formatDate = (d: string | null) => (d ? `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}` : null);

// Vəzifə sırası: müdir ən üstdə, sonra servis müdirləri, sonra qalanlar (web management/utils/rank ilə eyni)
export function rank(position: string | null) {
  const p = (position ?? "").toLocaleLowerCase("az");
  if (p === "müdir") return 0;
  return p.includes("müdir") ? 1 : 2;
}
export const sortManagers = (m: Person[]) => [...m].sort((a, b) => rank(a.position) - rank(b.position) || a.full_name.localeCompare(b.full_name, "az"));

type Att = { employee_id: number; checked_in_at: string; checked_out_at: string | null };

// Bu günkü vəziyyət: işdədir → işi bitirib → icazəli → bazar → hələ gəlməyib (web buildStatus ilə eyni)
export function buildStatus(people: Person[], attendance: Att[], leaves: { employee_id: number }[], sunday: boolean) {
  const onLeave = new Set(leaves.map((l) => l.employee_id));
  const status: Record<number, PersonStatus> = {};
  for (const p of people) {
    const rows = attendance.filter((a) => a.employee_id === p.id).sort((a, b) => a.checked_in_at.localeCompare(b.checked_in_at));
    if (rows.some((a) => !a.checked_out_at)) status[p.id] = { kind: "in", text: `İşdədir · ${timeBaku(rows[0].checked_in_at)}-dən` };
    else if (rows.length) status[p.id] = { kind: "done", text: `İşi bitirib · ${timeBaku(rows[rows.length - 1].checked_out_at!)}` };
    else if (onLeave.has(p.id)) status[p.id] = { kind: "leave", text: "İcazəlidir" };
    else status[p.id] = { kind: "none", text: sunday ? "Bazar günü" : "Hələ gəlməyib" };
  }
  return status;
}

// Ustaya görə bu gün və bu ay yazılan iş sayı
export function countWork(logs: { employee_id: number; work_date: string }[], today: string) {
  const day: Record<number, number> = {};
  const month: Record<number, number> = {};
  for (const l of logs) {
    month[l.employee_id] = (month[l.employee_id] ?? 0) + 1;
    if (l.work_date === today) day[l.employee_id] = (day[l.employee_id] ?? 0) + 1;
  }
  return { day, month };
}
