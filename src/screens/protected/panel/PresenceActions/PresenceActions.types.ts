import type { PresenceAction, TodayAttendance } from "@typings/panel";

export type PresenceActionsProps = {
  day: TodayAttendance | undefined;
  busy: boolean;
  onAction: (action: PresenceAction) => void;
};
