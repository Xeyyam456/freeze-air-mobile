import type { MyHold, ReturnDraft } from "@typings/tools";

export type ReturnLineProps = { hold: MyHold; draft: ReturnDraft; onChange: (d: ReturnDraft) => void };
