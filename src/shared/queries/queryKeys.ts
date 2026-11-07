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
  attendanceEmployees: ["attendance-employees"] as const,
  monthAttendance: (month: string) => ["month-attendance", month] as const,
  employeeMonth: (id: number, month: string) => ["employee-month", id, month] as const,
  announcements: ["announcements"] as const,
  announcer: ["announcer"] as const,
  unreadAnnouncements: ["unread-announcements"] as const,
  myLeaves: (employeeId: number) => ["my-leaves", employeeId] as const,
  team: ["team-employees", "v2"] as const, // v2: partner artıq siyahıdır (köhnə disk keşi atılsın)
  feed: (group: string) => ["feed", group] as const,
  managers: ["team-managers"] as const,
  employeeWork: (id: number) => ["employee-work", id, "v2"] as const, // v2: qeydlərdə logIds var (köhnə disk keşi atılsın)
  myFuel: (employeeId: number, from: string, to: string) => ["my-fuel", employeeId, from, to] as const,
};
