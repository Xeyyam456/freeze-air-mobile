import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { cancelRequest, confirmHold, createRequests, createReturns, fetchMyTools } from "@shared/services/tools.service";
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

  // Bir və ya bir neçə qaytarma (toplu): hər biri ayrıca sorğu olur, hamısı klik anında "Qaytarma gözləyir" görünür
  const giveBack = useCallback((items: { hold: MyHold; calc: ReturnCalc }[], note: string) => {
    const now = new Date().toISOString();
    const ok = items.filter((it) => it.hold.tools);
    const temps: MyRequest[] = ok.map(({ hold: h, calc: c }, i) => {
      const t = h.tools as NonNullable<MyHold["tools"]>;
      const material = t.kind === "material";
      return { id: -Date.now() - i, type: "return", status: "pending", tool_id: h.tool_id, tool_name: t.name, tool_kind: t.kind, unit: t.unit, quantity: material ? null : c.quantity,
        used: material ? c.used : null, returned: material ? c.returned : null, assignment_id: h.id, created_at: now, decided_by_name: null, decision_note: null };
    });
    const list = ok.map(({ hold: h, calc: c }) => ({ assignmentId: h.id, name: h.tools?.name ?? "", material: h.tools?.kind === "material", quantity: c.quantity, used: c.used, returned: c.returned }));
    run((x) => ({ ...x, requests: [...temps, ...x.requests] }), () => createReturns(list, note),
      [list.length === 1 ? "Qaytarma sorğusu göndərildi" : `${list.length} qaytarma sorğusu göndərildi`, "Depo qəbul edəndə səndən çıxacaq"]);
    setSelected(new Set());
  }, [run]);

  // Toplu seçim: yalnız qaytarmaq olanlar (təsdiqlənib və qaytarma sorğusu gözləmir)
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const returnable = useCallback((h: MyHold) => !!h.received_at && !d.pendingReturn.has(h.id), [d.pendingReturn]);
  const selectable = useMemo(() => d.list.filter(returnable), [d.list, returnable]);
  const chosen = useMemo(() => (data?.holds ?? []).filter((h) => selected.has(h.id) && returnable(h)), [data, selected, returnable]);
  const allOn = selectable.length > 0 && selectable.every((h) => selected.has(h.id));
  const toggle = useCallback((h: MyHold) => setSelected((s) => { const n = new Set(s); if (n.has(h.id)) n.delete(h.id); else n.add(h.id); return n; }), []);
  const toggleAll = useCallback(() => setSelected((s) => { const n = new Set(s); for (const h of selectable) { if (allOn) n.delete(h.id); else n.add(h.id); } return n; }), [selectable, allOn]);

  const ask = useCallback((items: { tool: StockTool; amount: number }[], note: string) => {
    const now = new Date().toISOString();
    const temps: MyRequest[] = items.map((it, i) => ({ id: -Date.now() - i, type: "request", status: "pending", tool_id: it.tool.id, tool_name: it.tool.name, tool_kind: it.tool.kind, unit: it.tool.unit,
      quantity: it.amount, used: null, returned: null, assignment_id: null, created_at: now, decided_by_name: null, decision_note: null }));
    run((x) => ({ ...x, requests: [...temps, ...x.requests] }),
      () => createRequests(items.map((it) => ({ toolId: it.tool.id, name: it.tool.name, amount: it.amount })), note, batchId()), [`${items.length} istək göndərildi`, "Depo məsulu təsdiqləyəndə sənə veriləcək"]);
  }, [run]);

  return { me, data, ...d, tab, setTab, query, setQuery, confirm, cancel, giveBack, ask, selected, returnable, chosen, allOn, toggle, toggleAll, selectableCount: selectable.length, loading: q.isPending && !!me, error: !!q.error && !data,
    reload: async () => { await q.refetch(); } };
}

export default useMyTools;
