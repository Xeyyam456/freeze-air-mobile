import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchCompanyDetail, fetchMonthWorks, fetchPlaceWork } from "@shared/services/companies.service";

const fold = (s: string) => s.toLocaleLowerCase("az").replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g");

// Şirkət detalı: filiallar (axtarışla), son işlər, tab (Filiallar / Son işlər)
function useCompanyDetail(id: number) {
  const d = useQuery({ queryKey: queryKeys.company(id), queryFn: () => fetchCompanyDetail(id), staleTime: 5 * 60_000 });
  const w = useQuery({ queryKey: queryKeys.companyWork(id), queryFn: () => fetchPlaceWork(id) });
  const month = useQuery({ queryKey: queryKeys.companyMonth, queryFn: fetchMonthWorks, staleTime: 5 * 60_000 });
  const [tab, setTab] = useState<"units" | "work">("units");
  const [query, setQuery] = useState("");
  const units = useMemo(() => {
    const q = fold(query.trim());
    return (d.data?.units ?? []).filter((u) => !q || fold(`${u.code} ${u.name} ${u.address ?? ""}`).includes(q));
  }, [d.data, query]);
  const reload = async () => { await Promise.all([d.refetch(), w.refetch(), month.refetch()]); };
  return { monthWorks: month.data?.[id] ?? 0, lastWork: w.data?.[0]?.day ?? null, company: d.data?.company ?? null, allUnits: d.data?.units ?? [], units, work: w.data ?? [], workLoading: w.isPending, tab, setTab, query, setQuery,
    loading: d.isPending, missing: d.isSuccess && !d.data, error: !!d.error && !d.data, reload };
}

export default useCompanyDetail;
