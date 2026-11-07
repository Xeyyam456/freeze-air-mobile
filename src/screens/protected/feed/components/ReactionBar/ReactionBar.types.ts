import type { FeedPost, Reaction } from "@typings/feed";

export type ReactionBarProps = {
  post: FeedPost;
  mine: boolean; // mənim paylaşımım: reaksiya seçə bilmərəm, sayları görürəm
  onReact: (post: FeedPost, kind: Reaction) => void;
  onReactors: (post: FeedPost) => void; // kimlər reaksiya verib
  onComments: (post: FeedPost) => void;
};
