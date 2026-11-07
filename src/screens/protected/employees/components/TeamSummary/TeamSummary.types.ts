import type { EmployeeFilter } from "@typings/team";

export type TeamSummaryProps = {
  total: number;
  counts: Record<Exclude<EmployeeFilter, "all">, number>;
  filter: EmployeeFilter;
  onChange: (f: EmployeeFilter) => void;
};
