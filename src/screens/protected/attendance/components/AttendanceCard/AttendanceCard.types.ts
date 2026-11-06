import type { AttendanceEmployee, MonthAttendance } from "@typings/attendance";

export type AttendanceCardProps = {
  employee: AttendanceEmployee;
  summary: MonthAttendance | null;
  isMe: boolean;
  isCurrent: boolean; // cari ay: bu günün nişanı görünür
  onOpen: (e: AttendanceEmployee) => void;
};
