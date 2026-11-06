import type { LeaveFilter } from "@typings/leaves";

export type LeaveFiltersProps = { value: LeaveFilter; counts: Record<LeaveFilter, number>; onChange: (f: LeaveFilter) => void };
