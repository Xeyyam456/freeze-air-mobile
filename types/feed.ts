// İş lenti (WhatsApp qrupu kimi): "Görülən işlər" və "Aktlar" — tapşırıq qeydinə yüklənən fayllardan avtomatik formalaşır
export type FeedGroup = "work" | "act";

export type FeedFile = { id: number; kind: "act" | "photo" | "video"; path: string; url?: string };

// Reaksiya: 👍 up, 👎 down, ❤️ heart, 👏 clap, 🙏 pray; hər usta bir paylaşıma bir reaksiya verir
export type Reaction = "up" | "down" | "heart" | "clap" | "pray";
export type ReactionCounts = Partial<Record<Reaction, number>>;

// Bir iş qeydinin paylaşımı: usta, yer, yazı, faylları (bir kartda), reaksiyalar, şərh sayı, birlikdə işləyən ustalar
export type FeedPost = {
  logId: number;
  employeeId: number; // paylaşımın müəllifi (öz paylaşımına reaksiya vermək olmur)
  at: string; // ən son fayl yüklənmə anı (ISO)
  name: string;
  photo: string | null;
  place: string;
  company: string | null;
  description: string;
  files: FeedFile[];
  reactions: ReactionCounts; // növ üzrə say
  mine: Reaction | null; // mənim reaksiyam
  comments: number;
  partners: string[]; // eyni tapşırıq qrupundakı digər ustalar (ad və soyad)
};

// Reaksiya verən usta/rəhbər (siyahı pəncərəsi)
export type FeedLiker = { id: number; name: string; photo: string | null; role: string; kind: Reaction };

// Şərh + ona verilən reaksiyalar (növ üzrə say) və mənim reaksiyam
export type FeedComment = { id: number; employeeId: number; name: string; photo: string | null; body: string; at: string; reactions: ReactionCounts; mine: Reaction | null };
