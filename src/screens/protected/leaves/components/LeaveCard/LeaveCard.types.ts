import type { MyLeave } from "@typings/leaves";

export type LeaveCardProps = {
  leave: MyLeave;
  active: boolean; // aktiv bölmədə: düymələr görünür
  today: string;
  onGiveUp: (l: MyLeave) => void;
  onCancel: (l: MyLeave) => void;
};
