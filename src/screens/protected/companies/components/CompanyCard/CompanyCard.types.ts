import type { Company, CompanyKind } from "@typings/companies";

export type CompanyCardProps = { kind: CompanyKind; company: Company; works: number; onPress: (c: Company) => void };
