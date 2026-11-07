import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchErrorCodes } from "@shared/services/errorCodes.service";
import { pushRecentCode, useRecentCodes } from "@shared/stores/recentCodes";
import { compareCodes, filterCodes, toRows } from "@shared/utils/errorCodes";
import type { ErrorCode } from "@typings/errorCodes";

// Xəta kodları ekranının vəziyyəti: model (standart — ən çox kodu olan), axtarış, açılmış kod (alt panel) və son baxılanlar.
// Məlumat dəyişmir: uzun keş
function useErrorCodes() {
  const q = useQuery({ queryKey: queryKeys.errorCodes, queryFn: fetchErrorCodes, staleTime: 24 * 3_600_000 });
  const [picked, setModel] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const recentIds = useRecentCodes();

  const all = q.data?.codes;
  const counts = useMemo(() => {
    const m = new Map<number, number>();
    for (const c of all ?? []) m.set(c.model_id, (m.get(c.model_id) ?? 0) + 1);
    return m;
  }, [all]);
  const modelId = picked ?? [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const codes = useMemo(() => (all ?? []).filter((c) => c.model_id === modelId).sort((a, b) => compareCodes(a.code, b.code)), [all, modelId]);
  const shown = useMemo(() => filterCodes(codes, query), [codes, query]);
  const rows = useMemo(() => toRows(shown), [shown]);

  const open = (all ?? []).find((c) => c.id === openId) ?? null;
  const sameModel = open ? (all ?? []).filter((c) => c.model_id === open.model_id).sort((a, b) => compareCodes(a.code, b.code)) : [];
  const at = open ? sameModel.findIndex((c) => c.id === open.id) : -1;
  const names = new Map((q.data?.models ?? []).map((m) => [m.id, m.name]));
  const recent = recentIds.flatMap((id) => (all ?? []).filter((c) => c.id === id));

  return {
    loading: q.isPending, error: !!q.error && !q.data, reload: q.refetch,
    models: q.data?.models ?? [], counts, modelId, names,
    setModelId: (id: number) => setModel(id),
    query, setQuery, rows, total: shown.length, recent,
    open, modelName: names.get(open?.model_id ?? -1) ?? "",
    twins: open ? (all ?? []).filter((c) => c.code === open.code && c.id !== open.id) : [],
    prev: at > 0 ? sameModel[at - 1] : null, next: at >= 0 && at < sameModel.length - 1 ? sameModel[at + 1] : null,
    openCode: (c: ErrorCode) => { setOpenId(c.id); pushRecentCode(c.id); },
    closeCode: () => setOpenId(null),
  };
}

export default useErrorCodes;
