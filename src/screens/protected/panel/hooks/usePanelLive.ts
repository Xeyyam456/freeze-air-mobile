import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState } from "react-native";
import { supabase } from "@shared/api/supabase";

// Bir ümumi Realtime kanalı (API.md §12): dəyişiklik gələndə aid keş açarları təzələnir (dövri sorğu yox).
// Kanal açmazdan əvvəl setAuth vacibdir, yoxsa anon kimi qoşulur və RLS-ə görə hadisə gəlmir.
const TABLE_KEYS: Record<string, string[]> = {
  attendance: ["my-today", "month-attendance", "employee-month", "team-employees"],
  attendance_absences: ["my-today", "month-attendance", "employee-month"],
  leave_requests: ["my-today", "month-attendance", "employee-month", "my-leaves", "team-employees"],
  tasks: ["tasks-view", "tasks-week", "my-day-stats", "work-history", "my-overview", "employee-work"],
  tool_assignments: ["my-day-stats"],
  // Yanacaq (0077–0081): yürüşlər və şirkətin verdiyi pul (admin ödəniş yazanda dərhal görünür)
  mileage_logs: ["my-fuel"],
  fuel_payments: ["my-fuel"],
  // Akt/şəkil/video (0107): kartdakı fayl sayları + təmir qeydi ekranındakı mövcud fayllar (məs. web-də silinəndə)
  work_files: ["tasks-view", "work-files", "work-history", "employee-work", "feed", "feed-unread"],
  // Elanlar (0098): siyahı + tab nişanı; Elanlar ekranı açıqdırsa yenisi dərhal oxunmuş sayılır (useAnnouncementsSeen)
  announcements: ["announcements", "unread-announcements"],
  // İş lenti: başqası bəyənəndə say kartda dəyişsin
  feed_likes: ["feed", "feed-unread"],
  feed_comments: ["feed", "feed-unread"],
  feed_comment_reactions: ["feed"],
};

function usePanelLive() {
  const qc = useQueryClient();
  useEffect(() => {
    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;
    // Yazı gedərkən (optimistik vəziyyət ekrandadır) başqasının hadisəsi köhnə məlumatı geri gətirməsin:
    // yazı bitəndə onSettled özü təzələyir
    const refresh = (names: string[]) => {
      if (qc.isMutating() > 0) return;
      names.forEach((n) => qc.invalidateQueries({ queryKey: [n] }));
    };

    // Kanal qoparsa (Wi-Fi yuxusu, şəbəkə dəyişməsi) 3 san sonra yenidən qurulur; hər uğurlu qoşulmada fonda buraxılmış hadisələr üçün hamısı təzələnir
    const open = async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled || !data.session) return;
      supabase.realtime.setAuth(data.session.access_token);
      let ch = supabase.channel(`panel-${Date.now()}`);
      for (const [table, names] of Object.entries(TABLE_KEYS)) {
        ch = ch.on("postgres_changes", { event: "*", schema: "public", table }, () => refresh(names));
      }
      const mine: ReturnType<typeof supabase.channel> = ch.subscribe((status) => {
        if (cancelled || channel !== mine) return; // köhnə (artıq bağlanmış) kanalın siqnalı sayılmır
        if (status === "SUBSCRIBED") refresh(Object.values(TABLE_KEYS).flat());
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          const old = channel;
          channel = null;
          if (old) void supabase.removeChannel(old);
          retry = setTimeout(() => void open(), 3000);
        }
      });
      channel = mine;
    };
    let retry: ReturnType<typeof setTimeout> | null = null;
    void open();

    // Fondan qayıdanda: fonda buraxılmış hadisələr ola bilər → hamısını təzələ
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") refresh(["my-today", "my-day-stats", "work-history", "my-overview", "tasks-view", "tasks-week", "work-files", "month-attendance", "employee-month", "announcements", "unread-announcements", "my-leaves", "my-fuel", "team-employees", "employee-work", "feed", "feed-unread"]);
    });
    // Token yenilənəndə Realtime-a da yeni token
    const auth = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "TOKEN_REFRESHED" && s) supabase.realtime.setAuth(s.access_token);
    });

    return () => {
      cancelled = true;
      if (retry) clearTimeout(retry);
      sub.remove();
      auth.data.subscription.unsubscribe();
      if (channel) void supabase.removeChannel(channel);
    };
  }, [qc]);
}

export default usePanelLive;
