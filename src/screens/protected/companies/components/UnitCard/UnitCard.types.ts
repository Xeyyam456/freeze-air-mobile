import type { Unit } from "@typings/companies";

export type UnitCardProps = { unit: Unit; onNav: (u: Unit) => void; onMap: (u: Unit) => void; onFix: (u: Unit) => void };
