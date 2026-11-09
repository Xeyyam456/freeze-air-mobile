import type { FeedFile } from "@typings/feed";

export type MediaGridProps = { files: FeedFile[]; onImages: (images: string[], start: number) => void };
