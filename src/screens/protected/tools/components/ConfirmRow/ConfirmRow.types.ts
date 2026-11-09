import type { MyHold } from "@typings/tools";

export type ConfirmRowProps = { hold: MyHold; onConfirm: (h: MyHold, received: boolean) => void };
