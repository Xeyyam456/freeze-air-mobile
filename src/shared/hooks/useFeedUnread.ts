import { useQuery } from "@tanstack/react-query";
import useMe from "@shared/hooks/useMe";
import { fetchFeedUnread } from "@shared/services/feed.service";
import { useFeedSeen } from "@shared/stores/feedSeen";
import type { FeedGroup } from "@typings/feed";

// Qrupda oxunmamış iş sayı (canlı: work_files Realtime → "feed-unread"). Qrupu açanda "baxıldı" yazılır və say sıfırlanır
function useFeedUnread(group: FeedGroup) {
  const me = useMe().data?.employee?.id ?? null;
  const since = useFeedSeen(group);
  return useQuery({ queryKey: ["feed-unread", group, since, me], queryFn: () => fetchFeedUnread(group, since, me), select: (n) => n }).data ?? 0;
}

export default useFeedUnread;
