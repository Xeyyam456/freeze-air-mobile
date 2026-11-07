import { supabase } from "@shared/api/supabase";
import { isReaction } from "@shared/config/reactions";
import type { FeedGroup, FeedLiker, Reaction, ReactionCounts } from "@typings/feed";

export type FeedMeta = {
  reactions: Map<number, { counts: ReactionCounts; mine: Reaction | null }>;
  comments: Map<number, number>;
  partners: Map<number, string[]>;
};

// Lent kartlarının əlavə məlumatı (paylaşımlar üçün bir dəfəyə): reaksiya sayları + mənim reaksiyam, şərh sayı,
// birlikdə işləyən ustalar (iş qeydinin tapşırıq qrupundakı digər üzvlər; ad və soyad)
export async function fetchFeedMeta(group: FeedGroup, authors: Map<number, number>, me: number | null): Promise<FeedMeta> {
  const ids = [...authors.keys()];
  const meta: FeedMeta = { reactions: new Map(), comments: new Map(), partners: new Map() };
  if (!ids.length) return meta;

  const [likes, comments, mine] = await Promise.all([
    supabase.from("feed_likes").select("work_log_id, employee_id, kind").eq("grp", group).in("work_log_id", ids),
    supabase.from("feed_comments").select("work_log_id").eq("grp", group).in("work_log_id", ids),
    supabase.from("tasks").select("work_log_id, group_id").in("work_log_id", ids).not("group_id", "is", null),
  ]);
  for (const k of likes.data ?? []) {
    const r = meta.reactions.get(k.work_log_id) ?? { counts: {}, mine: null };
    const kind = isReaction(k.kind) ? k.kind : "up";
    r.counts[kind] = (r.counts[kind] ?? 0) + 1;
    if (k.employee_id === me) r.mine = kind;
    meta.reactions.set(k.work_log_id, r);
  }
  for (const c of comments.data ?? []) meta.comments.set(c.work_log_id, (meta.comments.get(c.work_log_id) ?? 0) + 1);

  const groupOf = new Map((mine.data ?? []).map((t) => [t.work_log_id as number, t.group_id as string]));
  const groups = [...new Set(groupOf.values())];
  if (!groups.length) return meta;
  const { data: members } = await supabase.from("tasks").select("group_id, employee_id").in("group_id", groups).is("cancelled_at", null);
  const empIds = [...new Set((members ?? []).map((m) => m.employee_id))];
  const { data: emps } = await supabase.from("employees").select("id, full_name").in("id", empIds);
  const name = new Map((emps ?? []).map((e) => [e.id, e.full_name]));
  for (const [logId, g] of groupOf) {
    const others = [...new Set((members ?? []).filter((m) => m.group_id === g && m.employee_id !== authors.get(logId)).map((m) => m.employee_id))];
    meta.partners.set(logId, others.map((id) => name.get(id)).filter((n): n is string => !!n));
  }
  return meta;
}

// Reaksiya: kind = null → geri götür; növ → seç (başqası seçilibsə əvəzlənir). RLS: yalnız öz adından, öz paylaşımına yox
export async function setFeedReaction(logId: number, group: FeedGroup, me: number, kind: Reaction | null) {
  const key = { work_log_id: logId, grp: group, employee_id: me };
  const { error } = kind
    ? await supabase.from("feed_likes").upsert({ ...key, kind }, { onConflict: "work_log_id,grp,employee_id" })
    : await supabase.from("feed_likes").delete().match(key);
  if (error) throw new Error(error.message);
}

// Reaksiya verənlər (vaxt sırası ilə): ad, şəkil, ixtisas/vəzifə, 👍/👎
export async function fetchFeedLikers(logId: number, group: FeedGroup): Promise<FeedLiker[]> {
  const { data, error } = await supabase.from("feed_likes").select("employee_id, kind").eq("work_log_id", logId).eq("grp", group).order("created_at");
  if (error) throw error;
  const rows = data ?? [];
  if (!rows.length) return [];
  const { data: emps, error: e2 } = await supabase.from("employees").select("id, full_name, photo_url, position, specialty").in("id", rows.map((r) => r.employee_id));
  if (e2) throw e2;
  const byId = new Map((emps ?? []).map((e) => [e.id, e]));
  return rows.flatMap((r) => {
    const e = byId.get(r.employee_id);
    return e ? [{ id: r.employee_id, name: e.full_name, photo: e.photo_url, role: e.specialty ?? e.position, kind: (isReaction(r.kind) ? r.kind : "up") as Reaction }] : [];
  });
}
