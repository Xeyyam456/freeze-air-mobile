import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchMe } from "@shared/services/auth.service";

// Kim girib: hesab + əməkdaş kartı. Keşdən dərhal gəlir, dəyişmə nadirdir (5 dəq təzə sayılır).
function useMe() {
  return useQuery({ queryKey: queryKeys.me, queryFn: fetchMe, staleTime: 5 * 60_000 });
}

export default useMe;
