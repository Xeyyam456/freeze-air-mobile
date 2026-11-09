import type { MyHold, ReturnCalc } from "@typings/tools";

export type ReturnSheetProps = { hold: MyHold; onSend: (h: MyHold, c: ReturnCalc, note: string) => void; onClose: () => void };
