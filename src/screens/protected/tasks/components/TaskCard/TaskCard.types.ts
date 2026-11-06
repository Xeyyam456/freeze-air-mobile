import type { Task, TaskEmployee } from "@typings/tasks";

export type TaskCardProps = { task: Task; mates: TaskEmployee[]; past: boolean; onToggle: (t: Task) => void; onNote: (t: Task) => void };
