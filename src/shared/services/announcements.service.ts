import { supabase } from "@shared/api/supabase";
import type { Announcement, Announcer } from "@typings/announcements";

// Elanlar (API.md §10): hamı oxuyur; göndərmək rəhbərlikdir — bazada RLS yoxlayır
export async function fetchAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase.from("announcements")
    .select("id, title, body, created_by, created_by_name, created_at").order("created_at", { ascending: false }).limit(100);
  if (error) throw error;
  return data ?? [];
}

// Göndərən kimdir və rəhbərlikdirmi (form yalnız onlara görünür)
export async function fetchAnnouncer(): Promise<Announcer> {
  const [{ data: { user } }, { data: canSend }] = await Promise.all([supabase.auth.getUser(), supabase.rpc("is_management")]);
  return { me: user?.id ?? null, canSend: canSend === true };
}

export async function createAnnouncement(title: string, body: string) {
  const { error } = await supabase.from("announcements").insert({ title: title.trim(), body: body.trim() });
  if (error) throw new Error(error.code === "42501" ? "Elanı yalnız rəhbərlik göndərə bilər." : error.message);
}

export async function deleteAnnouncement(id: number) {
  const { data, error } = await supabase.from("announcements").delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Elanı yalnız müəllifi silə bilər.");
}

// Oxunmamış elanlar (tab nişanı): son baxışdan sonra başqasının yazdığı. Telefon və kompüter eyni sayı görür (bazadadır)
export async function fetchUnreadAnnouncements(): Promise<number> {
  const { data, error } = await supabase.rpc("unread_announcements");
  if (error) throw error;
  return data ?? 0;
}

export async function markAnnouncementsSeen() {
  await supabase.rpc("mark_announcements_seen");
}
