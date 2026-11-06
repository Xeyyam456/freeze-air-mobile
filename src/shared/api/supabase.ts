import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import type { Database } from "@typings/database";
import { SUPABASE_KEY, SUPABASE_URL } from "@shared/config/env";
import { authStorage } from "@shared/api/storage";

// Tək Supabase klienti. Sessiya MMKV-də saxlanır (app bağlanıb açılanda giriş qalır).
// Bütün sorğular: mobile/docs/API.md.
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: { storage: authStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});

// Token yalnız app ön plandaykən yenilənir (fonda taymer işləmir); qayıdanda dərhal yoxlanır
AppState.addEventListener("change", (state) => {
  if (state === "active") void supabase.auth.startAutoRefresh();
  else void supabase.auth.stopAutoRefresh();
});
