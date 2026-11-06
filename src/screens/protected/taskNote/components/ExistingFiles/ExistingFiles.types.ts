import type { SavedFile } from "@typings/taskNote";

export type ExistingFilesProps = { saved: SavedFile[] | null; removed: Set<number>; onToggle: (id: number) => void };
