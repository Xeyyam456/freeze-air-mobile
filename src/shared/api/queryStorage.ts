import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createMMKV } from "react-native-mmkv";
import { queryClient } from "@shared/api/queryClient";

// Sorğu keşi diskdə (MMKV, sinxron): app açılan an son məlumat ekrandadır, arxada təzələnir.
// Sessiyadan (storage.ts) ayrı instans: yalnız API cavabları saxlanır, çıxışda tam silinir.
const cache = createMMKV({ id: "freeze-air-query-cache" });

export const queryPersister = createAsyncStoragePersister({
  storage: {
    getItem: (key) => cache.getString(key) ?? null,
    setItem: (key, value) => cache.set(key, value),
    removeItem: (key) => {
      cache.remove(key);
    },
  },
});

// Keşdəki məlumatın forması dəyişəndə artır: köhnə keş atılır
const CACHE_BUSTER = "v1";

export const persistOptions = {
  persister: queryPersister,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  buster: CACHE_BUSTER,
};

// Çıxışda: həm yaddaş, həm disk
export function clearQueryCache() {
  queryClient.clear();
  cache.clearAll();
}
