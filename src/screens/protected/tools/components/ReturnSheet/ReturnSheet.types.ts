import type { MyHold, ReturnCalc } from "@typings/tools";

export type ReturnSheetProps = { holds: MyHold[]; onSend: (items: { hold: MyHold; calc: ReturnCalc }[], note: string) => void; onClose: () => void };
