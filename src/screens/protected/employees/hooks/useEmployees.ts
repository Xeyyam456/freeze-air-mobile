import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchEmployees } from "@shared/services/team.service";
import type { EmployeeFilter } from "@typings/team";

// Azərbaycan hərflərini sadələşdir ("Əli" ~ "eli"), axtarış üçün
const norm = (s: string) => s.toLocaleLowerCase("az").replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g");

// Ustalar: vəziyyət süzgəci, keşdən dərhal (canlı: attendance/leave_requests → team-employees), axtarış (ad, ixtisas, telefon), öz kartım ən başda
function useEmployees() {
  const me = useMe().data?.employee?.id ?? null;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<EmployeeFilter>("all");
  const q = useQuery({ queryKey: queryKeys.team, queryFn: fetchEmployees });

  const counts = useMemo(() => {
    const n = { in: 0, done: 0, leave: 0, none: 0 };
    for (const st of Object.values(q.data?.status ?? {})) n[st.kind] += 1;
    return n;
  }, [q.data]);

  const people = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean);
    return (q.data?.people ?? [])
      .filter((p) => filter === "all" || q.data?.status[p.id]?.kind === filter)
      .filter((p) => { const h = norm(`${p.full_name} ${p.specialty ?? ""} ${p.phone ?? ""}`); return words.every((w) => h.includes(w)); })
      .sort((a, b) => Number(b.id === me) - Number(a.id === me));
  }, [q.data, query, filter, me]);

  return { me, data: q.data, people, counts, filter, setFilter, query, setQuery, loading: q.isPending, error: !!q.error && !q.data, reload: q.refetch };
}

export default useEmployees;
