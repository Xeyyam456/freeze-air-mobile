import { supabase } from "@shared/api/supabase";
import type { FeedFile, FeedGroup, FeedLiker, FeedPost } from "@typings/feed";

// Paylaşımı kimlər bəyənib (bəyənmə vaxtı sırası ilə): ad, şəkil, ixtisas/vəzifə
export async function fetchFeedLikers(logId: number, group: FeedGroup): Promise<FeedLiker[]> {
  const { data, error } = await supabase.from("feed_likes").select("employee_id").eq("work_log_id", logId).eq("grp", group).order("created_at");
  if (error) throw error;
  const ids = (data ?? []).map((r) => r.employee_id);
  if (!ids.length) return [];
  const { data: emps, error: e2 } = await supabase.from("employees").select("id, full_name, photo_url, position, specialty").in("id", ids);
  if (e2) throw e2;
  const byId = new Map((emps ?? []).map((e) => [e.id, e]));
  return ids.flatMap((id) => {
    const e = byId.get(id);
    return e ? [{ id, name: e.full_name, photo: e.photo_url, role: e.specialty ?? e.position }] : [];
  });
}

// İş lenti (API.md §3/§4): work_files + iş qeydi + usta + yer. "work" qrupu şəkil və video, "act" qrupu aktlar.
// Son 300 fayl, yeni üstdə; bir iş qeydinin faylları bir kartda toplanır. Bucket gizlidir → imzalı linklər (1 saat), bir sorğuda
export async function fetchFeed(group: FeedGroup, me: number | null): Promise<FeedPost[]> {
  const { data, error } = await supabase.from("work_files")
    .select("id, kind, path, created_at, work_log_id, work_logs(id, employee_id, description, place_text, employees(full_name, photo_url), stores(code, name, companies(name)), companies(name))")
    .in("kind", group === "act" ? ["act"] : ["photo", "video"])
    .order("created_at", { ascending: false }).limit(300);
  if (error) throw error;
  const rows = data ?? [];
  const { data: signed } = rows.length ? await supabase.storage.from("work").createSignedUrls(rows.map((r) => r.path), 3600) : { data: [] };

  const posts = new Map<number, FeedPost>();
  rows.forEach((r, i) => {
    const l = r.work_logs;
    if (!l) return;
    const file: FeedFile = { id: r.id, kind: r.kind as FeedFile["kind"], path: r.path, url: signed?.[i]?.signedUrl ?? undefined };
    const found = posts.get(l.id);
    if (found) { found.files.push(file); return; }
    posts.set(l.id, {
      logId: l.id,
      employeeId: l.employee_id,
      likes: 0,
      liked: false,
      at: r.created_at,
      name: l.employees?.full_name ?? "",
      photo: l.employees?.photo_url ?? null,
      place: l.stores ? `${l.stores.code} ${l.stores.name}` : l.companies?.name ?? l.place_text ?? "Yer yazılmayıb",
      company: l.stores?.companies?.name ?? null,
      description: l.description,
      files: [file],
    });
  });
  const ids = [...posts.keys()];
  const { data: likes } = ids.length ? await supabase.from("feed_likes").select("work_log_id, employee_id").eq("grp", group).in("work_log_id", ids) : { data: [] };
  for (const k of likes ?? []) {
    const p = posts.get(k.work_log_id);
    if (!p) continue;
    p.likes += 1;
    if (k.employee_id === me) p.liked = true;
  }
  return [...posts.values()].map((p) => ({ ...p, files: p.files.reverse() }));
}

// Bəyən / bəyənməni geri götür (RLS: yalnız öz adından, öz paylaşımını yox)
export async function setFeedLike(logId: number, group: FeedGroup, me: number, on: boolean) {
  const row = { work_log_id: logId, grp: group, employee_id: me };
  const { error } = on ? await supabase.from("feed_likes").insert(row) : await supabase.from("feed_likes").delete().match(row);
  if (error) throw new Error(error.message);
}

// Oxunmamış paylaşım sayı: "since"-dən sonra yüklənmiş fayllı iş qeydləri (öz işlərim sayılmır). Yüngül sorğu — yalnız yeni sətirlər
export async function fetchFeedUnread(group: FeedGroup, since: string, me: number | null): Promise<number> {
  let q = supabase.from("work_files").select("work_log_id, work_logs!inner(employee_id)")
    .in("kind", group === "act" ? ["act"] : ["photo", "video"]).gt("created_at", since).limit(500);
  if (me) q = q.neq("work_logs.employee_id", me);
  const { data, error } = await q;
  if (error) throw error;
  return new Set((data ?? []).map((r) => r.work_log_id)).size;
}
