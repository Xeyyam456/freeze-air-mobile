import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchAnnouncements, fetchAnnouncer } from "@shared/services/announcements.service";
import { buildRows } from "@shared/utils/helpers/announcements";

// Elanlar siyahısı (gün başlıqları ilə) + kim baxır / göndərə bilərmi. Keşdən dərhal; canlı: usePanelLive
function useAnnouncements() {
  const list = useQuery({ queryKey: queryKeys.announcements, queryFn: fetchAnnouncements });
  const who = useQuery({ queryKey: queryKeys.announcer, queryFn: fetchAnnouncer, staleTime: 10 * 60_000 });
  const rows = useMemo(() => buildRows(list.data ?? []), [list.data]);
  return {
    rows,
    ready: !!list.data,
    error: !!list.error && !list.data,
    me: who.data?.me ?? null,
    canSend: who.data?.canSend ?? false,
    reload: () => Promise.all([list.refetch(), who.refetch()]),
  };
}

export default useAnnouncements;
