// TanStack Query açarları bir yerdə (web ilə eyni adlar). Realtime hadisəsi hansı açarları təzələyir: hooks/usePanelLive.
export const queryKeys = {
  me: ["me"] as const,
  today: (employeeId: number) => ["my-today", employeeId] as const,
  stats: (employeeId: number) => ["my-day-stats", employeeId] as const,
  workHistory: (day: string) => ["work-history", day] as const,
  overview: (employeeId: number) => ["my-overview", employeeId] as const,
  tasksDay: (day: string) => ["tasks-view", day] as const,
  tasksWeek: (from: string) => ["tasks-week", from] as const,
  workFiles: (logId: number) => ["work-files", logId] as const,
};
