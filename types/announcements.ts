// Elanlar (API.md §10; 0098, oxunmamış 0105)
export type Announcement = {
  id: number;
  title: string;
  body: string | null;
  created_by: string | null; // auth user id
  created_by_name: string | null;
  created_at: string;
};

// Kim baxır və göndərə bilərmi (rəhbərlik: admin və ya rəhbərlik kartı)
export type Announcer = { me: string | null; canSend: boolean };

// FlashList sətirləri: gün başlığı + elanlar
export type AnnouncementRowItem =
  | { kind: "day"; key: string; label: string }
  | { kind: "item"; key: string; item: Announcement; first: boolean; last: boolean };
