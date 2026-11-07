// Kondisioner xəta kodları (yalnız baxış): model → kodlar; izah (title) və edilecək iş (solution)
export type ErrorModel = { id: number; name: string };
export type ErrorCode = { id: number; model_id: number; code: string; title: string; solution: string | null };
export type ErrorCodesData = { models: ErrorModel[]; codes: ErrorCode[] };

// Siyahı sətirləri: kodun ilk simvoluna görə başlıq ("E") + kodlar
export type CodeRowItem =
  | { type: "head"; key: string; letter: string; count: number }
  | { type: "code"; key: string; code: ErrorCode; first: boolean; last: boolean };
