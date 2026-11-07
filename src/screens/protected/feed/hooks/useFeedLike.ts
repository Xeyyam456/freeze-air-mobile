import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { setFeedLike } from "@shared/services/feed.service";
import { toast } from "@shared/utils/toast";
import type { FeedGroup, FeedPost } from "@typings/feed";

// Bəyən / geri götür — OPTİMİSTİK: ürək və say klik anında dəyişir, baza arxada; xətada geri qayıdır
function useFeedLike(group: FeedGroup, me: number | null) {
  const qc = useQueryClient();
  return useCallback((post: FeedPost) => {
    if (!me || post.employeeId === me) return;
    const key = queryKeys.feed(group);
    const on = !post.liked;
    void qc.cancelQueries({ queryKey: key });
    const prev = qc.getQueryData<FeedPost[]>(key);
    qc.setQueryData<FeedPost[]>(key, (l) => l?.map((p) => (p.logId === post.logId ? { ...p, liked: on, likes: Math.max(0, p.likes + (on ? 1 : -1)) } : p)));
    setFeedLike(post.logId, group, me, on)
      .catch((e: Error) => { qc.setQueryData(key, prev); toast.error(e.message); })
      .finally(() => qc.invalidateQueries({ queryKey: key }));
  }, [qc, group, me]);
}

export default useFeedLike;
