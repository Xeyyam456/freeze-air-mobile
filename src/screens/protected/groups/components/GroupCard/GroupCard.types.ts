import type { GroupLink } from "@shared/config/groups";
import type { FeedPost } from "@typings/feed";

export type GroupCardProps = { link: GroupLink; last: FeedPost | null; unread: number; onPress: () => void };
