import { useSyncExternalStore } from "react";
import { createMMKV } from "react-native-mmkv";
import type { FeedGroup } from "@typings/feed";

// Lentdə "oxunmamış" hesabı: hər qrup üçün son baxılan paylaşımın vaxtı (telefonda, MMKV). İlk dəfə: indiki an (köhnələr oxunmuş sayılır)
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
export function markFeedSeen(group: FeedGroup, iso: string) {
  if (Date.parse(iso) <= Date.parse(getFeedSeen(group))) return;
  store.set(key(group), iso);
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

export const useFeedSeen = (group: FeedGroup) => useSyncExternalStore(subscribe, () => getFeedSeen(group));
