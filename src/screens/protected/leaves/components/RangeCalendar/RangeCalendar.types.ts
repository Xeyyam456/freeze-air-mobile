export type RangeCalendarProps = {
  month: string; // "2026-11"
  today: string;
  from: string | null;
  to: string | null;
  onMonth: (n: number) => void;
  onPick: (day: string) => void;
};
