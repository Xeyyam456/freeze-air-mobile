import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { cancelRequest, confirmHold, createRequests, createReturn, fetchMyTools } from "@shared/services/tools.service";
import { batchId } from "@shared/utils/tools";
import { toast } from "@shared/utils/toast";
import type { MyHold, MyRequest, MyToolsData, ReturnCalc, StockTool, ToolKind } from "@typings/tools";

const fold = (s: string) => s.toLocaleLowerCase("az");

// Alətlərim: keşdən dərhal, canlı (usePanelLive: tool_assignments, depot_requests). Hər əməliyyat OPTİMİSTİKDİR: siyahı klik anında dəyişir,
// baza arxada yazılır, xətada köhnə vəziyyətə qayıdır; sonda həmişə bazadakı həqiqətlə təzələnir
function useMyTools() {
  const qc = useQueryClient();
  const me = useMe().data?.employee?.id;
  const key = queryKeys.myTools(me ?? 0);
  const q = useQuery({ queryKey: key, queryFn: () => fetchMyTools(me!), enabled: !!me });
  const [tab, setTab] = useState<ToolKind>("tool");
  const [query, setQuery] = useState("");
  const data = q.data;

  const d = useMemo(() => {
    const holds = data?.holds ?? [];
    const requests = data?.requests ?? [];
    const pendingReturn = new Map(requests.filter((r) => r.type === "return" && r.status === "pending").map((r) => [r.assignment_id, r]));
    const list = holds.filter((h) => (h.tools?.kind === "material" ? "material" : "tool") === tab && fold(h.tools?.name ?? "").includes(fold(query.trim())));
    return {
      toConfirm: holds.filter((h) => !h.received_at),
      tools: holds.filter((h) => h.tools?.kind !== "material"),
      materials: holds.filter((h) => h.tools?.kind === "material"),
      pendingReq: requests.filter((r) => r.status === "pending"),
      askedIds: new Set(requests.filter((r) => r.type === "request" && r.status === "pending" && r.tool_id).map((r) => r.tool_id as number)),
      pendingReturn, list,
    };
  }, [data, tab, query]);

  const run = useCallback((change: (x: MyToolsData) => MyToolsData, write: () => Promise<void>, ok: [string, string?]) => {
    if (!me) return;
    void qc.cancelQueries({ queryKey: key });
    const prev = qc.getQueryData<MyToolsData>(key);
    qc.setQueryData<MyToolsData>(key, (x) => (x ? change(x) : x));
    write().then(() => toast.success(...ok)).catch((e: Error) => { qc.setQueryData(key, prev); toast.error(e.message); })
      .finally(() => { void qc.invalidateQueries({ queryKey: ["my-tools"] }); void qc.invalidateQueries({ queryKey: ["my-day-stats"] }); });
  }, [qc, me, key]);

  const confirm = useCallback((h: MyHold, received: boolean) => {
    const at = new Date().toISOString();
    run((x) => ({ ...x, holds: x.holds.map((y) => (y.id !== h.id ? y : received ? { ...y, received_at: at } : { ...y, disputed_at: at })) }),
      () => confirmHold(h.id, received), received ? ["Təsdiqləndi: aldın"] : ["Depo məsuluna bildirildi", "O yoxlayacaq"]);
  }, [run]);

  const cancel = useCallback((r: MyRequest) => {
    run((x) => ({ ...x, requests: x.requests.map((y) => (y.id === r.id ? { ...y, status: "cancelled" } : y)) }),
      () => cancelRequest(r.id), [r.type === "return" ? "Qaytarma sorğusu ləğv edildi" : "İstək ləğv edildi"]);
  }, [run]);

  const giveBack = useCallback((h: MyHold, c: ReturnCalc, note: string) => {
    const t = h.tools;
    if (!t) return;
    const material = t.kind === "material";
    const temp: MyRequest = { id: -Date.now(), type: "return", status: "pending", tool_id: h.tool_id, tool_name: t.name, tool_kind: t.kind, unit: t.unit, quantity: material ? null : c.quantity,
      used: material ? c.used : null, returned: material ? c.returned : null, assignment_id: h.id, created_at: new Date().toISOString(), decided_by_name: null, decision_note: null };
    run((x) => ({ ...x, requests: [temp, ...x.requests] }),
      () => createReturn({ assignmentId: h.id, material, quantity: c.quantity, used: c.used, returned: c.returned, note }), ["Qaytarma sorğusu göndərildi", "Depo qəbul edəndə səndən çıxacaq"]);
  }, [run]);

  const ask = useCallback((items: { tool: StockTool; amount: number }[], note: string) => {
    const now = new Date().toISOString();
    const temps: MyRequest[] = items.map((it, i) => ({ id: -Date.now() - i, type: "request", status: "pending", tool_id: it.tool.id, tool_name: it.tool.name, tool_kind: it.tool.kind, unit: it.tool.unit,
      quantity: it.amount, used: null, returned: null, assignment_id: null, created_at: now, decided_by_name: null, decision_note: null }));
    run((x) => ({ ...x, requests: [...temps, ...x.requests] }),
      () => createRequests(items.map((it) => ({ toolId: it.tool.id, name: it.tool.name, amount: it.amount })), note, batchId()), [`${items.length} istək göndərildi`, "Depo məsulu təsdiqləyəndə sənə veriləcək"]);
  }, [run]);

  return { me, data, ...d, tab, setTab, query, setQuery, confirm, cancel, giveBack, ask, loading: q.isPending && !!me, error: !!q.error && !data,
    reload: async () => { await q.refetch(); } };
}

export default useMyTools;
