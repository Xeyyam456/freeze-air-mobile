import type { Announcement } from "@typings/announcements";

export type AnnouncementRowProps = {
  item: Announcement;
  first: boolean; // günün ilk elanı (kartın üst kənarı)
  last: boolean; // günün son elanı (kartın alt kənarı)
  mine: boolean;
  onDelete: (id: number) => void;
};
