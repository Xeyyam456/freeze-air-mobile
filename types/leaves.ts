// İcazələrim (API.md §7): ustanın öz icazə sorğuları
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export type MyLeave = {
  id: number; // mənfi = göndərilir (optimistik)
  employee_id: number;
  date_from: string;
  date_to: string;
  reason: string | null;
  status: string;
  created_at: string;
  decided_at: string | null;
};

export type LeaveFilter = "all" | "approved" | "rejected" | "cancelled";

// Xülasə: bu il / bu ay icazə günü, gözləyən, növbəti təsdiqli (hələ başlamamış) icazə
export type LeaveStats = { year: number; month: number; pending: number; next: MyLeave | null };

// FlashList sətirləri: bölmə başlığı, boş yazı, süzgəc çipləri, ay başlığı, kart
export type LeaveRow =
  | { kind: "title"; key: string; title: string }
  | { kind: "empty"; key: string; text: string }
  | { kind: "filters"; key: string }
  | { kind: "month"; key: string; label: string }
  | { kind: "leave"; key: string; leave: MyLeave; active: boolean };
