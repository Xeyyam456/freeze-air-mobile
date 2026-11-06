import type { DayEntry, Presence } from "@typings/attendance";

export type HoursRowProps = { entry: DayEntry & { presence: Presence } };
