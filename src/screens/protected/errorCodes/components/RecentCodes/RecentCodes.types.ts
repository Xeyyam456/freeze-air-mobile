import type { ErrorCode } from "@typings/errorCodes";

export type RecentCodesProps = { codes: ErrorCode[]; names: Map<number, string>; onOpen: (c: ErrorCode) => void };
