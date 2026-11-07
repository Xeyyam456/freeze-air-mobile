// Komanda (Ustalar / Rəhbərlik) tipləri
export type Person = {
  id: number;
  full_name: string;
  photo_url: string | null;
  position: string;
  specialty: string | null;
  phone: string | null;
  start_date: string | null;
  has_car: boolean;
  car_plate: string | null;
  car_model: string | null;
};

export type PersonStatus = { kind: "in" | "done" | "leave" | "none"; text: string };

export type EmployeesData = {
  people: Person[];
  status: Record<number, PersonStatus>;
  today: Record<number, number>; // bu gün yazılan iş
  month: Record<number, number>; // bu ay yazılan iş
};

export type EmployeeFilter = "all" | PersonStatus["kind"];

// Ustanın bir iş qeydi (ətraflı: harada, nə iş)
export type WorkEntry = { id: number; work_date: string; created_at: string; description: string; place: string; company: string | null; files: number };
