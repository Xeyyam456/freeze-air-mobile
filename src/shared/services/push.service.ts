import { supabase } from "@shared/api/supabase";

// Mobil push tokeni (Expo) bazada: bildiriş gələndə Edge Function `push` bu tokenə göndərir (API.md §13)
export async function registerPushToken(token: string, platform: "android" | "ios") {
  const { error } = await supabase.rpc("register_push_token", { p_token: token, p_platform: platform });
  if (error) throw new Error(error.message);
}

// Çıxışdan əvvəl: bu telefona artıq bildiriş getməsin
export async function unregisterPushToken(token: string) {
  await supabase.rpc("unregister_push_token", { p_token: token });
}
