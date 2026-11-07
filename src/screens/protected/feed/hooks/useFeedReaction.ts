import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { setFeedReaction } from "@shared/services/feedMeta.service";
import { toast } from "@shared/utils/toast";
import type { FeedGroup, FeedPost, Reaction } from "@typings/feed";

// 👍 / 👎 — OPTİMİSTİK: say və seçim klik anında dəyişir, baza arxada; xətada geri qayıdır.
// Eyni işarəyə təkrar toxunuş geri götürür; digərinə toxunuş əvəzləyir (bir usta bir paylaşıma bir reaksiya verir)
function useFeedReaction(group: FeedGroup, me: number | null) {
  const qc = useQueryClient();
  return useCallback((post: FeedPost, kind: Reaction) => {
    if (!me || post.employeeId === me) return;
    const next = post.mine === kind ? null : kind;
    const key = queryKeys.feed(group);
    void qc.cancelQueries({ queryKey: key });
    const prev = qc.getQueryData<FeedPost[]>(key);
    const count = (k: Reaction, n: number) => n - (post.mine === k ? 1 : 0) + (next === k ? 1 : 0);
    qc.setQueryData<FeedPost[]>(key, (l) => l?.map((p) => (p.logId === post.logId ? { ...p, mine: next, up: count("up", p.up), down: count("down", p.down) } : p)));
    setFeedReaction(post.logId, group, me, next)
      .catch((e: Error) => { qc.setQueryData(key, prev); toast.error(e.message); })
      .finally(() => qc.invalidateQueries({ queryKey: key }));
  }, [qc, group, me]);
}

export default useFeedReaction;
