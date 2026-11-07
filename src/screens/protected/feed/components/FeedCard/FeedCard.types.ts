import type { FeedPost, Reaction } from "@typings/feed";

export type FeedCardProps = {
  post: FeedPost;
  mine: boolean; // mənim paylaşımım: reaksiya verə bilmərəm, sayları görürəm
  onImages: (images: string[], start: number) => void; // şəkil/akt şəkli tam ekran
  onReact: (post: FeedPost, kind: Reaction) => void; // 👍 / 👎
  onReactors: (post: FeedPost) => void; // kimlər reaksiya verib
  onComments: (post: FeedPost) => void; // şərhlər
};
