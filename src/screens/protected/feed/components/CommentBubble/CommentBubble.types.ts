import type { FeedComment } from "@typings/feed";

export type CommentBubbleProps = { comment: FeedComment; mine: boolean; canDelete: boolean; onDelete: (c: FeedComment) => void };
