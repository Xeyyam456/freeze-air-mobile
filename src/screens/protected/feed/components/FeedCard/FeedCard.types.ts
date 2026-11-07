import type { FeedPost } from "@typings/feed";

export type FeedCardProps = {
  post: FeedPost;
  onImages: (images: string[], start: number) => void; // şəkil/akt şəkli tam ekran
};
