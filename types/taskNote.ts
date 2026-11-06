// Təmir qeydi ekranı tipləri (API.md §4 task_set_note + §6 fayllar)

export type FileKind = "act" | "photo" | "video";

// Ekrana ötürülən tapşırıq (kartdan): yazı görüldü olmuş tapşırığa əlavə olunur
export type NoteTask = {
  id: number;
  group_id: string | null;
  logId: number | null;
  reason: string;
  place: string;
  note: string | null;
  day: string;
};

// Bazadakı fayl (şəkil imzalı linklə)
export type SavedFile = { id: number; kind: FileKind; path: string; url?: string };

// Telefonda seçilən yeni fayl (yükləmə yadda saxlayanda arxada gedir)
// seconds: video müddəti (saxlayanda arxada 720p-yə sıxılır)
export type NewFile = { uri: string; kind: FileKind; mime: string; width?: number; height?: number; seconds?: number };

export type PickSource = "camera" | "gallery" | "pdf";

// Yadda saxlama: yazı + silinəcək və əlavə olunacaq fayllar
export type NoteSave = { task: NoteTask; note: string; remove: SavedFile[]; add: NewFile[] };
