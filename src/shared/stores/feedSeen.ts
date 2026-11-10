import { useSyncExternalStore } from "react";
import { createMMKV } from "react-native-mmkv";
import { supabase } from "@shared/api/supabase";
import type { FeedGroup } from "@typings/feed";

// Lentdə "oxunmamış" hesabı: hər qrup üçün son baxış vaxtı. Əsas mənbə bazadır (feed_seen, 0114): web/admin-də oxunan
// burada da oxunmuşdur. MMKV yalnız keşdir (dərhal cavab). İlk dəfə: indiki an (köhnələr oxunmuş sayılır)
const store = createMMKV({ id: "freeze-air-feed-seen" });
const listeners = new Set<() => void>();
const key = (g: FeedGroup) => `seen:${g}`;

export function getFeedSeen(group: FeedGroup): string {
  const v = store.getString(key(group));
  if (v) return v;
  const now = new Date().toISOString();
  store.set(key(group), now);
  return now;
}

// Yalnız irəli gedir (köhnə vaxt yazmaq oxunmuşu geri qaytarmasın)
function setLocal(group: FeedGroup, iso: string) {
  const cur = store.getString(key(group));
  if (cur && Date.parse(iso) <= Date.parse(cur)) return false;
  store.set(key(group), iso);
  listeners.forEach((l) => l());
  return true;
}

export function markFeedSeen(group: FeedGroup, iso: string) {
  if (setLocal(group, iso)) void supabase.rpc("mark_feed_seen", { p_grp: group, p_at: iso });
}

// Bazadakı vaxtları keşə köçürür (başqa cihazda baxılıbsa nişan sönür)
export async function syncFeedSeen(): Promise<true> {
  const { data } = await supabase.rpc("my_feed_seen");
  for (const r of data ?? []) setLocal(r.grp as FeedGroup, r.seen_at);
  return true;
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

export const useFeedSeen = (group: FeedGroup) => useSyncExternalStore(subscribe, () => getFeedSeen(group));
