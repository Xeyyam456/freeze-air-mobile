// Panel ("Mənim günüm") tipləri

export type Me = {
  uid: string;
  email: string;
  employee: { id: number; full_name: string; position: string; photo_url: string | null; has_car: boolean } | null;
  keeper: boolean; // depo məsulu / admin (can_manage_tools)
};

export type Session = { in: string; out: string | null };

// pending: hələ gəlməyib · present: işdədir/işi bitirib · leave: təsdiqli icazə · absent: admin "işdə olmayıb" · sunday: bazar
export type DayStatus = "pending" | "present" | "leave" | "absent" | "sunday";

export type TodayAttendance = {
  status: DayStatus;
  sessions: Session[];
  leaveId: number | null;
};

export type MyDayStats = {
  today: number;
  month: number;
  tasks: { total: number; done: number };
  tools: number;
  materials: number;
};

export type DayLog = {
  id: number;
  created_at: string;
  description: string;
  place: string;
  people: { name: string; photo: string | null }[]; // qrup işində bir neçə usta
};

// Davamiyyət düyməsi: işə gəldim / işi bitirdim / icazədən imtina + işə gəldim
export type PresenceAction = "in" | "out" | "giveUpLeave";

// Panel dashboard-u: ayın icmalı (öz işlərim)
export type DayCount = { day: string; count: number };

export type MonthOverview = {
  week: DayCount[]; // son 7 gün (bu gün daxil)
  month: DayCount[]; // ayın bütün günləri (1..son)
  monthTotal: number;
  prevTotal: number; // keçən ayın tam sayı
  activeDays: number; // iş görülən gün sayı
  places: { name: string; count: number }[]; // ən çox işlənən 5 yer
};
