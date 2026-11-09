import type { Company } from "@typings/companies";

export type CompanyHeroProps = { kind: "company" | "market"; company: Company; units: number; coordPct: number; works: number; last: string | null; onNav: () => void; onMap: () => void; onFix: () => void };
