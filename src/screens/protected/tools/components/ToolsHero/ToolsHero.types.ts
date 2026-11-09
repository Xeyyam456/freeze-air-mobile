import type { ToolKind } from "@typings/tools";

export type ToolsHeroProps = { tools: number; materials: number; toConfirm: number; pending: number; kind: ToolKind; onAsk: () => void };
