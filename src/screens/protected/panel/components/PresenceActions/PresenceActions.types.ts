import type { PresenceAction, TodayAttendance } from "@typings/panel";

export type PresenceActionsProps = {
  day: TodayAttendance | undefined;
  onAction: (action: PresenceAction) => void;
};
