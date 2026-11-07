import type { Company } from "@typings/companies";

export type CompanyCardProps = { company: Company; works: number; onPress: (c: Company) => void };
