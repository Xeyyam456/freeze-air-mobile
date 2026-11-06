import { useState } from "react";

// Aşağı çəkib yeniləmə (RefreshControl): fırlanan işarə yalnız istifadəçi çəkəndə görünür
function useReload(reload: () => Promise<unknown>) {
  const [refreshing, setRefreshing] = useState(false);
  async function onRefresh() {
    setRefreshing(true);
    try {
      await reload();
    } finally {
      setRefreshing(false);
    }
  }
  return { refreshing, onRefresh };
}

export default useReload;
