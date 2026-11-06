import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState } from "react-native";
import { supabase } from "@shared/api/supabase";

// Bir ümumi Realtime kanalı (API.md §12): dəyişiklik gələndə aid keş açarları təzələnir (dövri sorğu yox).
// Kanal açmazdan əvvəl setAuth vacibdir, yoxsa anon kimi qoşulur və RLS-ə görə hadisə gəlmir.
const TABLE_KEYS: Record<string, string[]> = {
  attendance: ["my-today"],
  attendance_absences: ["my-today"],
  leave_requests: ["my-today"],
  tasks: ["tasks-view", "tasks-week", "my-day-stats", "work-history", "my-overview"],
  tool_assignments: ["my-day-stats"],
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

    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled || !data.session) return;
      supabase.realtime.setAuth(data.session.access_token);
      let ch = supabase.channel("panel");
      for (const [table, names] of Object.entries(TABLE_KEYS)) {
        ch = ch.on("postgres_changes", { event: "*", schema: "public", table }, () => refresh(names));
      }
      channel = ch.subscribe();
    })();

    // Fondan qayıdanda: fonda buraxılmış hadisələr ola bilər → hamısını təzələ
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") refresh(["my-today", "my-day-stats", "work-history", "my-overview", "tasks-view", "tasks-week"]);
    });
    // Token yenilənəndə Realtime-a da yeni token
    const auth = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "TOKEN_REFRESHED" && s) supabase.realtime.setAuth(s.access_token);
    });

    return () => {
      cancelled = true;
      sub.remove();
      auth.data.subscription.unsubscribe();
      if (channel) void supabase.removeChannel(channel);
    };
  }, [qc]);
}

export default usePanelLive;
