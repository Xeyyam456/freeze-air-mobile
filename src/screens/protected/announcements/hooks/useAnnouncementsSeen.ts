import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useUnreadAnnouncements from "@shared/hooks/useUnreadAnnouncements";
import { queryKeys } from "@shared/queries/queryKeys";
import { markAnnouncementsSeen } from "@shared/services/announcements.service";

// Elanlar ekranı görünəndə hamısı oxundu: nişan dərhal 0, bazada da (telefon və kompüter eyni sayı görür).
// Ekran açıq ikən yeni elan gəlsə (Realtime → say artır) o da dərhal oxunmuş sayılır
function useAnnouncementsSeen() {
  const qc = useQueryClient();
  const focused = useIsFocused();
  const unread = useUnreadAnnouncements();
  useEffect(() => {
    if (!focused || unread === 0) return;
    qc.setQueryData(queryKeys.unreadAnnouncements, 0);
    void markAnnouncementsSeen().catch(() => undefined);
  }, [focused, unread, qc]);
}

export default useAnnouncementsSeen;
