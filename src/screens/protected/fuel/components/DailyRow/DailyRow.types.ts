import type { DayCoverage, MileageRow } from "@typings/fuel";

export type DailyRowProps = { row: MileageRow; got: number; maxKm: number; today: string; pay: DayCoverage | undefined };
