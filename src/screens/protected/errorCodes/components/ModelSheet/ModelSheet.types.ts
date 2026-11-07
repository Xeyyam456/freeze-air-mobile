import type { ErrorModel } from "@typings/errorCodes";

export type ModelSheetProps = { models: ErrorModel[]; counts: Map<number, number>; value: number | null; onPick: (id: number) => void; onClose: () => void };
