import { supabase } from "@shared/api/supabase";
import type { MyLeave } from "@typings/leaves";

// Ustanın bütün icazə sorğuları (son 300), yeni tarix yuxarıda (API.md §7 "İcazələrim")
export async function fetchMyLeaves(employeeId: number): Promise<MyLeave[]> {
  const { data, error } = await supabase.from("leave_requests")
    .select("id, employee_id, date_from, date_to, reason, status, created_at, decided_at")
    .eq("employee_id", employeeId).order("date_from", { ascending: false }).limit(300);
  if (error) throw error;
  return data ?? [];
}

// Yeni sorğu (admin/rəhbərlik təsdiqləyir; cavab push bildiriş kimi gəlir)
export async function submitLeave(employeeId: number, from: string, to: string, reason: string) {
  const { error } = await supabase.from("leave_requests").insert({ employee_id: employeeId, date_from: from, date_to: to, reason: reason.trim() || null });
  if (error) throw new Error(error.message);
}

// Təsdiqlənmişə ehtiyac qalmadı: ləğv (başlayıbsa keçmiş günlər icazəli qalır — bazada leave_cancel)
export async function giveUpLeave(id: number) {
  const { error } = await supabase.rpc("leave_cancel", { p_id: id });
  if (error) throw new Error(error.message);
}

// Gözləyən sorğunu geri götür
export async function cancelLeave(id: number) {
  const { data, error } = await supabase.from("leave_requests").delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Sorğu artıq cavablandırılıb, geri götürmək olmur.");
}
