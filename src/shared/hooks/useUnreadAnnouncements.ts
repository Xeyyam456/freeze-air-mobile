import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchUnreadAnnouncements } from "@shared/services/announcements.service";

// Oxunmamış elanların sayı (tab bar nişanı). Canlı: usePanelLive (announcements → unread-announcements);
// Elanlar ekranı açıq olanda sıfırlanır (useAnnouncementsSeen)
function useUnreadAnnouncements() {
  return useQuery({ queryKey: queryKeys.unreadAnnouncements, queryFn: fetchUnreadAnnouncements }).data ?? 0;
}

export default useUnreadAnnouncements;
