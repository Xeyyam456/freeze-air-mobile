import { supabase } from "@shared/api/supabase";
import { buildOverview, type OverviewRow } from "@shared/utils/overview";
import { addDays, monthStartBaku, prevMonthStart, todayBaku } from "@shared/utils/time";
import type { MonthOverview } from "@typings/panel";

// Dashboard məlumatı bir dəfəyə (API.md §2 "Panel statistikası"): bu ayın + son 7 günün öz işləri və keçən ayın sayı.
// Hesablama (günlər, top yerlər) shared/utils/overview-dadır.
export async function fetchMonthOverview(employeeId: number): Promise<MonthOverview> {
  const today = todayBaku();
  const monthStart = monthStartBaku();
  const weekStart = addDays(today, -6);
  const from = weekStart < monthStart ? weekStart : monthStart;
  const prevStart = prevMonthStart(today);

  const [cur, prev] = await Promise.all([
    supabase.from("work_logs").select("work_date, place_text, stores(code, name, companies(name)), companies(name)")
      .eq("employee_id", employeeId).gte("work_date", from).lte("work_date", today),
    supabase.from("work_logs").select("id", { count: "exact", head: true })
      .eq("employee_id", employeeId).gte("work_date", prevStart).lt("work_date", monthStart),
  ]);
  if (cur.error) throw cur.error;
  return buildOverview((cur.data ?? []) as OverviewRow[], today, prev.count ?? 0);
}
