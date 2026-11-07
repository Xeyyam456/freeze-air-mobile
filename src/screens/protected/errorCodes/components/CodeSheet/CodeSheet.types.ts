import type { ErrorCode } from "@typings/errorCodes";

export type CodeSheetProps = {
  code: ErrorCode;
  modelName: string;
  twins: (ErrorCode & { model: string })[]; // eyni kod başqa modellərdə
  prev: ErrorCode | null;
  next: ErrorCode | null;
  onSelect: (c: ErrorCode) => void;
  onClose: () => void;
};
