// Tapşırıqlar tabı tipləri (API.md §4)

export type TaskFiles = { act: number; photo: number; video: number };

export type PlaceKind = "store" | "company" | "text";

export type Task = {
  id: number;
  employee_id: number;
  group_id: string | null; // qrup tapşırığı: biri "görüldü" basanda hamı üçün görülür
  reason: string;
  done: boolean;
  note: string | null;
  work_log_id: number | null;
  cancelled_at: string | null; // admin geri alıb: tarixçə kimi qalır, işarələnmir
  place: string;
  placeKind: PlaceKind;
  files: TaskFiles; // qrup üzrə cəm (fayl istənilən üzvün iş qeydinə yüklənə bilər)
  nextName?: string; // geri alınıb → kimə verilib
};

export type TaskEmployee = { id: number; full_name: string; photo_url: string | null };

export type DayTasks = { tasks: Task[]; employees: TaskEmployee[] };

export type WeekRow = { task_date: string; employee_id: number; group_id: string | null };

// Həftə zolağının bir günü: cəmi (qrup = 1) və mənimkilər
export type WeekDay = { day: string; total: number; mine: number };

// Ekranın FlashList sətirləri (bir siyahı: başlıqlar + mənim kartlarım + komanda kartları)
export type TaskListRow =
  | { kind: "title"; key: string; title: string; count: number }
  | { kind: "mine"; key: string; task: Task; mates: TaskEmployee[] } // mates: qrup yoldaşları
  | { kind: "team"; key: string; employee: TaskEmployee; tasks: Task[] }
  | { kind: "empty"; key: string; text: string };

export type TaskSummary = { total: number; done: number };
