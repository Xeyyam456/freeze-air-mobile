import { useSyncExternalStore } from "react";
import { createMMKV } from "react-native-mmkv";

// "Son baxılanlar" (xəta kodları): kod id-ləri, ən yenisi birinci, ən çox 8 (telefonda, MMKV)
const store = createMMKV({ id: "freeze-air-recent-codes" });
const listeners = new Set<() => void>();

const read = (): number[] => {
  try { return JSON.parse(store.getString("ids") ?? "[]") as number[]; } catch { return []; }
};
let cache = read();

export function pushRecentCode(id: number) {
  cache = [id, ...cache.filter((x) => x !== id)].slice(0, 8);
  store.set("ids", JSON.stringify(cache));
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
export const useRecentCodes = () => useSyncExternalStore(subscribe, () => cache);
