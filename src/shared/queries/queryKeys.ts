// TanStack Query açarları bir yerdə (web ilə eyni adlar). Realtime hadisəsi hansı açarları təzələyir: hooks/usePanelLive.
export const queryKeys = {
  me: ["me"] as const,
  today: (employeeId: number) => ["my-today", employeeId] as const,
  stats: (employeeId: number) => ["my-day-stats", employeeId] as const,
  workHistory: (day: string) => ["work-history", day] as const,
};
