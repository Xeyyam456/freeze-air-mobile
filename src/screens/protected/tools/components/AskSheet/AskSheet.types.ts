import type { StockTool, ToolKind } from "@typings/tools";

export type AskSheetProps = {
  stock: StockTool[];
  askedIds: Set<number>;
  initialKind: ToolKind;
  onSend: (items: { tool: StockTool; amount: number }[], note: string) => void;
  onClose: () => void;
};
