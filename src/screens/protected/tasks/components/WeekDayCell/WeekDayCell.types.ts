import type { WeekDay } from "@typings/tasks";

export type WeekDayCellProps = { d: WeekDay; selected: boolean; isToday: boolean; onPress: (day: string) => void };
