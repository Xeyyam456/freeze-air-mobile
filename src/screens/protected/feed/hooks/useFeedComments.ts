import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import { addFeedComment, deleteFeedComment, fetchFeedComments } from "@shared/services/feedComments.service";
import { toast } from "@shared/utils/toast";
import type { FeedComment, FeedGroup, FeedPost } from "@typings/feed";

// Paylaşımın şərhləri (canlı: feed_comments Realtime). Yazma və silmə OPTİMİSTİKDİR: şərh klik anında siyahıda,
// kartdakı say da dərhal dəyişir; baza arxada, xətada geri qayıdır
function useFeedComments(logId: number, group: FeedGroup) {
  const qc = useQueryClient();
  const me = useMe().data?.employee ?? null;
  const key = [...queryKeys.feed(group), "comments", logId];
  const q = useQuery({ queryKey: key, queryFn: () => fetchFeedComments(logId, group) });

  const bump = useCallback((n: number) => {
    qc.setQueryData<FeedPost[]>(queryKeys.feed(group), (l) => l?.map((p) => (p.logId === logId ? { ...p, comments: Math.max(0, p.comments + n) } : p)));
  }, [qc, group, logId]);

  const send = useCallback((body: string) => {
    if (!me || !body.trim()) return;
    const temp: FeedComment = { id: -Date.now(), employeeId: me.id, name: me.full_name, photo: me.photo_url, body: body.trim(), at: new Date().toISOString() };
    const prev = qc.getQueryData<FeedComment[]>(key);
    qc.setQueryData<FeedComment[]>(key, (l) => [...(l ?? []), temp]);
    bump(1);
    addFeedComment(logId, group, me.id, body)
      .catch((e: Error) => { qc.setQueryData(key, prev); bump(-1); toast.error(e.message); })
      .finally(() => qc.invalidateQueries({ queryKey: queryKeys.feed(group) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qc, me, logId, group, bump]);

  const remove = useCallback((c: FeedComment) => {
    const prev = qc.getQueryData<FeedComment[]>(key);
    qc.setQueryData<FeedComment[]>(key, (l) => l?.filter((x) => x.id !== c.id));
    bump(-1);
    deleteFeedComment(c.id)
      .catch((e: Error) => { qc.setQueryData(key, prev); bump(1); toast.error(e.message); })
      .finally(() => qc.invalidateQueries({ queryKey: queryKeys.feed(group) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qc, group, logId, bump]);

  return { comments: q.data ?? [], loading: q.isPending, me: me?.id ?? null, send, remove };
}

export default useFeedComments;
