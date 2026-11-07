import type { FeedGroup } from "@typings/feed";

export type CommentsSheetProps = {
  logId: number;
  group: FeedGroup;
  moderator: boolean; // rəhbərlik: hər şərhi silə bilər
  onClose: () => void;
};
