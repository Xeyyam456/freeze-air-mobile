import type { Held } from "@typings/tools";

export type WhoHasSheetProps = { all: Held[]; me: number | undefined; onClose: () => void };
