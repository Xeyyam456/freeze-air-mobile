import type { MyHold, MyRequest } from "@typings/tools";

export type HoldCardProps = { hold: MyHold; returning: MyRequest | undefined; selected: boolean; canSelect: boolean; onToggle: (h: MyHold) => void; onReturn: (h: MyHold) => void; onCancel: (r: MyRequest) => void };
