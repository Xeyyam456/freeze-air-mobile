// state: today (vurğu), past (iş var, solğun), zero (iş yoxdur — nöqtə), future (hələ gəlməyib — sönük nöqtə)
export type MonthBarProps = { height: number; index: number; state: "today" | "past" | "zero" | "future" };
