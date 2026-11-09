import { supabase } from "@shared/api/supabase";
import { monthStartBaku, todayBaku } from "@shared/utils/helpers/time";
import type { MyDayStats } from "@typings/panel";

// Panel göstəriciləri (API.md §2): bu gün / bu ay işlərim, bugünkü tapşırıqlar, məndə olan alət və materiallar.
// Tapşırıq sayında qrup 1 tapşırıqdır (group_id).
export async function fetchMyDayStats(employeeId: number): Promise<MyDayStats> {
  const today = todayBaku();
  const [day, month, tasks, held] = await Promise.all([
    supabase.from("work_logs").select("id", { count: "exact", head: true }).eq("employee_id", employeeId).eq("work_date", today),
    supabase.from("work_logs").select("id", { count: "exact", head: true }).eq("employee_id", employeeId)
      .gte("work_date", monthStartBaku()).lte("work_date", today),
    supabase.from("tasks").select("id, group_id, done").eq("employee_id", employeeId).eq("task_date", today).is("cancelled_at", null),
    supabase.from("tool_assignments").select("quantity, tools(kind)").eq("employee_id", employeeId).is("returned_at", null),
  ]);
  const t = new Map((tasks.data ?? []).map((x) => [x.group_id ?? `t${x.id}`, x.done]));
  const h = held.data ?? [];
  return {
    today: day.count ?? 0,
    month: month.count ?? 0,
    tasks: { total: t.size, done: [...t.values()].filter(Boolean).length },
    tools: h.filter((a) => a.tools?.kind !== "material").reduce((s, a) => s + Number(a.quantity), 0),
    materials: h.filter((a) => a.tools?.kind === "material").length,
  };
}
