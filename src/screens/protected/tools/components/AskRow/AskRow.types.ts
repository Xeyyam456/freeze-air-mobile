import type { StockTool } from "@typings/tools";

export type AskRowProps = {
  tool: StockTool; asked: boolean; qty: string | undefined; byPack: boolean;
  onToggle: () => void; onQty: (v: string) => void; onByPack: (v: boolean) => void;
};
