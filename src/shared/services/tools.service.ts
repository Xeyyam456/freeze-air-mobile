import { supabase } from "@shared/api/supabase";
import type { MyHold, MyRequest, MyToolsData, StockTool } from "@typings/tools";

const REQ = "id, type, status, tool_id, tool_name, tool_kind, unit, quantity, used, returned, assignment_id, created_at, decided_by_name, decision_note";

// Alətlərim (API.md §8): üzərimdəkilər, sorğularım (son 60), depodakı qalıq (istəmək üçün)
export async function fetchMyTools(employeeId: number): Promise<MyToolsData> {
  const [h, r, s] = await Promise.all([
    supabase.from("tool_assignments").select("id, tool_id, quantity, taken_at, received_at, disputed_at, tools(name, kind, unit, pack_name, pack_size)")
      .eq("employee_id", employeeId).is("returned_at", null).order("taken_at"),
    supabase.from("depot_requests").select(REQ).eq("employee_id", employeeId).in("type", ["return", "request", "writeoff"]).order("created_at", { ascending: false }).limit(60),
    supabase.from("tool_stock").select("id, name, kind, unit, available, pack_name, pack_size").order("name"),
  ]);
  if (h.error) throw h.error;
  if (r.error) throw r.error;
  if (s.error) throw s.error;
  const stock = (s.data ?? []).filter((t) => t.id !== null && t.name).map((t): StockTool => ({
    id: t.id as number, name: t.name as string, kind: t.kind ?? "tool", unit: t.unit ?? "", available: t.available ?? 0, pack_name: t.pack_name, pack_size: t.pack_size,
  }));
  return { holds: (h.data ?? []) as unknown as MyHold[], requests: (r.data ?? []) as MyRequest[], stock };
}

const fail = (e: { message: string } | null) => { if (e) throw new Error(e.message); };

// Aldım / Almadım
export async function confirmHold(id: number, received: boolean) {
  fail((await supabase.rpc("assignment_confirm", { p_id: id, p_received: received })).error);
}

// Gözləyən sorğunu geri götür
export async function cancelRequest(id: number) {
  fail((await supabase.rpc("depot_request_cancel", { p_id: id })).error);
}

// Qaytarma sorğusu: alətdə say, materialda qaytarılan + işlədilən
export async function createReturn(a: { assignmentId: number; material: boolean; quantity: number; used: number; returned: number; note: string }) {
  fail((await supabase.rpc("depot_return_create", {
    p_assignment_id: a.assignmentId, p_note: a.note.trim() || undefined,
    p_quantity: a.material ? undefined : a.quantity, p_used: a.material ? a.used : undefined, p_returned: a.material ? a.returned : undefined,
  })).error);
}

// Alət/material istəyi (bir neçə sətir, eyni batch): alınmayanlar xəta mətnində toplanır
export async function createRequests(items: { toolId: number; name: string; amount: number }[], note: string, batch: string) {
  const bad: string[] = [];
  for (const it of items) {
    const { error } = await supabase.rpc("depot_request_create", { p_tool_id: it.toolId, p_quantity: it.amount, p_note: note.trim() || undefined, p_batch: batch });
    if (error) bad.push(`${it.name}: ${error.message}`);
  }
  if (bad.length) throw new Error(bad.join("\n"));
}
