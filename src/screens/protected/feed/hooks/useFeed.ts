import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchFeed } from "@shared/services/feed.service";
import { searchPosts } from "@shared/utils/feed";
import type { FeedGroup } from "@typings/feed";

// İş lenti: qrup üzrə paylaşımlar (canlı: work_files → feed), axtarış. Linklər 1 saatlıqdır → ekran açılanda həmişə təzələnir
function useFeed(group: FeedGroup) {
  const [query, setQuery] = useState("");
  const q = useQuery({ queryKey: queryKeys.feed(group), queryFn: () => fetchFeed(group), refetchOnMount: "always" });
  const posts = useMemo(() => searchPosts(q.data ?? [], query), [q.data, query]);
  return { posts, latest: q.data?.[0]?.at ?? null, total: q.data?.length ?? 0, query, setQuery, loading: q.isPending, error: !!q.error && !q.data, reload: q.refetch };
}

export default useFeed;
