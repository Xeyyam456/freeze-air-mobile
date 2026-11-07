import type { FeedPost } from "@typings/feed";

export type FeedCardProps = {
  post: FeedPost;
  mine: boolean; // mənim paylaşımım: bəyənə bilmərəm, sayı görürəm
  onImages: (images: string[], start: number) => void; // şəkil/akt şəkli tam ekran
  onLike: (post: FeedPost) => void;
  onLikers: (post: FeedPost) => void; // kimlər bəyənib
};
