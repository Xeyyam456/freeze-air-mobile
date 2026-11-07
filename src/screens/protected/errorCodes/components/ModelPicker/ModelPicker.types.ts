import type { ErrorModel } from "@typings/errorCodes";

export type ModelPickerProps = { models: ErrorModel[]; counts: Map<number, number>; value: number | null; onChange: (id: number) => void };
