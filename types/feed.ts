// İş lenti (WhatsApp qrupu kimi): "Görülən işlər" və "Aktlar" — tapşırıq qeydinə yüklənən fayllardan avtomatik formalaşır
export type FeedGroup = "work" | "act";

export type FeedFile = { id: number; kind: "act" | "photo" | "video"; path: string; url?: string };

// Bir iş qeydinin paylaşımı: usta, yer, yazı, faylları (bir kartda)
export type FeedPost = {
  logId: number;
  employeeId: number; // paylaşımın müəllifi (öz paylaşımını bəyənmək olmur)
  likes: number;
  liked: boolean; // mən bəyənmişəm
  at: string; // ən son fayl yüklənmə anı (ISO)
  name: string;
  photo: string | null;
  place: string;
  company: string | null;
  description: string;
  files: FeedFile[];
};

// Bəyənən usta/rəhbər (siyahı pəncərəsi)
export type FeedLiker = { id: number; name: string; photo: string | null; role: string };
