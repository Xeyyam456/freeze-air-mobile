import type { MyHold, MyRequest } from "@typings/tools";

export type HoldCardProps = { hold: MyHold; returning: MyRequest | undefined; onReturn: (h: MyHold) => void; onCancel: (r: MyRequest) => void };
