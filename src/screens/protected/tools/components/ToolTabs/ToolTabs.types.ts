import type { ToolKind } from "@typings/tools";

export type ToolTabsProps = { value: ToolKind; onChange: (k: ToolKind) => void; tools?: number; materials?: number };
