import { supabase } from "@shared/api/supabase";
import { clearQueryCache } from "@shared/api/queryStorage";
import type { Me } from "@typings/panel";

// Girişdən sonra: hesab + əməkdaş kartı + depo yetkisi (API.md §1). Kart yoxdursa employee = null.
export async function fetchMe(): Promise<Me | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  const [{ data: employee, error }, { data: keeper }] = await Promise.all([
    supabase.from("employees").select("id, full_name, position, photo_url, has_car").eq("user_id", user.id).maybeSingle(),
    supabase.rpc("can_manage_tools"),
  ]);
  if (error) throw error;
  return { uid: user.id, email: user.email ?? "", employee: employee ?? null, keeper: keeper === true };
}

const LOGIN_ERRORS: Record<string, string> = {
  "Invalid login credentials": "E-poçt və ya parol səhvdir.",
  "Email not confirmed": "E-poçt təsdiqlənməyib.",
};

export async function signIn(email: string, password: string): Promise<string | null> {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (!error) return null;
  if (error.message.includes("Network") || error.message.includes("fetch")) return "İnternet bağlantısı yoxdur.";
  return LOGIN_ERRORS[error.message] ?? error.message;
}

// Çıxış: sessiya + keş (başqa hesab əvvəlkinin məlumatını görməsin)
export async function signOut() {
  await supabase.auth.signOut();
  clearQueryCache();
}
