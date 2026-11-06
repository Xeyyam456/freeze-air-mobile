import type { FileKind } from "@typings/taskNote";

export type FileThumbProps = { kind: FileKind; uri?: string; pdf?: boolean; dimmed?: boolean; onRemove: () => void };
