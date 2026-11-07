import type { FeedComment, Reaction } from "@typings/feed";

export type CommentBubbleProps = {
  comment: FeedComment;
  mine: boolean;
  canDelete: boolean;
  canReact: boolean;
  onDelete: (c: FeedComment) => void;
  onReact: (c: FeedComment, kind: Reaction) => void;
};
