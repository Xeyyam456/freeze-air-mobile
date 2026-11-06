import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { createAnnouncement, deleteAnnouncement } from "@shared/services/announcements.service";
import { toast } from "@shared/utils/toast";
import type { Announcement } from "@typings/announcements";

// Göndər və sil — OPTİMİSTİK: siyahı klik anında dəyişir, baza arxada; xətada siyahı geri qayıdır.
// Yeni elan müvəqqəti mənfi id ilə görünür, yazı bitəndə əsl sətir Realtime/təzələmə ilə gəlir
function useAnnouncementActions(me: string | null) {
  const qc = useQueryClient();
  const name = useMe().data?.employee?.full_name ?? null;
  const key = queryKeys.announcements;

  const run = useCallback((change: (list: Announcement[]) => Announcement[], write: () => Promise<void>, ok: string) => {
    void qc.cancelQueries({ queryKey: key });
    const prev = qc.getQueryData<Announcement[]>(key);
    qc.setQueryData<Announcement[]>(key, (l) => change(l ?? []));
    write()
      .then(() => toast.success(ok))
      .catch((e: Error) => {
        qc.setQueryData(key, prev);
        toast.error(e.message);
      })
      .finally(() => qc.invalidateQueries({ queryKey: key }));
  }, [qc, key]);

  const send = useCallback((title: string, body: string) => {
    const temp: Announcement = { id: -Date.now(), title: title.trim(), body: body.trim(), created_by: me, created_by_name: name, created_at: new Date().toISOString() };
    run((l) => [temp, ...l], () => createAnnouncement(title, body), "Elan hamıya göndərildi");
  }, [run, me, name]);

  const remove = useCallback((id: number) => {
    run((l) => l.filter((a) => a.id !== id), () => deleteAnnouncement(id), "Elan silindi");
  }, [run]);

  return { send, remove };
}

export default useAnnouncementActions;
