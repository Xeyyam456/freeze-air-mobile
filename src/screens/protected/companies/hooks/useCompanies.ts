import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchCompanies, fetchMonthWorks } from "@shared/services/companies.service";
import { filterCompanies, hasCoords } from "@shared/utils/helpers/companies";
import type { CompanyKind } from "@typings/companies";

// Şirkətlər ekranının vəziyyəti: siyahı (disk keşi), bu ayın işləri (ayrıca sorğu: siyahı gözləmir), axtarış, cəmlər (web xülasəsi ilə eyni)
function useCompanies(kind: CompanyKind) {
  const q = useQuery({ queryKey: queryKeys.companies(kind), queryFn: () => fetchCompanies(kind), staleTime: 5 * 60_000 });
  const month = useQuery({ queryKey: queryKeys.companyMonth, queryFn: fetchMonthWorks, staleTime: 5 * 60_000 });
  const [query, setQuery] = useState("");
  const all = q.data;
  const works = month.data ?? {};
  const list = useMemo(() => filterCompanies(all ?? [], query), [all, query]);
  const totals = useMemo(() => {
    const cs = all ?? [];
    return {
      companies: cs.length,
      units: cs.reduce((n, c) => n + c.stores.length, 0),
      fixed: cs.filter((c) => c.stores.length === 0).length,
      coords: cs.reduce((n, c) => n + c.stores.filter(hasCoords).length, 0),
      works: cs.reduce((n, c) => n + (works[c.id] ?? 0), 0),
    };
  }, [all, works]);
  return { list, totals, works, query, setQuery, loading: q.isPending, error: !!q.error && !q.data, reload: async () => { await Promise.all([q.refetch(), month.refetch()]); } };
}

export default useCompanies;
