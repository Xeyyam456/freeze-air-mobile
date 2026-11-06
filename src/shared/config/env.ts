// Env yalnız burada oxunur. Expo EXPO_PUBLIC_* dəyərlərini build zamanı koda yazır (yalnız statik müraciət işləyir).
// Dəyərlər `.env.local`-dadır (git-ignore); nümunə `.env.example`. Publishable açar gizli deyil, yetki bazada (RLS).
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY yoxdur: mobile/.env.local-a bax");
}
