import type { Task } from "@typings/tasks";

export type TaskNoteRowProps = { task: Task; editable: boolean; onNote: () => void };
