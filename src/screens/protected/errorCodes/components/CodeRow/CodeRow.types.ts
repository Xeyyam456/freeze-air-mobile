import type { ErrorCode } from "@typings/errorCodes";

export type CodeRowProps = { code: ErrorCode; first: boolean; last: boolean; onPress: (c: ErrorCode) => void };
