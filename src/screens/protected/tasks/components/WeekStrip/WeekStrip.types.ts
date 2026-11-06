import type { WeekDay } from "@typings/tasks";

export type WeekStripProps = {
  from: string;
  strip: WeekDay[];
  day: string;
  today: string;
  onSelect: (day: string) => void;
  onShift: (weeks: number) => void;
};
