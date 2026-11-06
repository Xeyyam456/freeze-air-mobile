import type { PickSource } from "@typings/taskNote";

export type SourceMenuProps = {
  title: string;
  sources: PickSource[];
  onPick: (s: PickSource) => void;
  onClose: () => void;
};
