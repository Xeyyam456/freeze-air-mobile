// Yanacaq (API.md §9; baza 0077–0081): maşını olan usta səhər/axşam spidometri yazır, km/litr/məbləğ bazada hesablanır
import type { Database } from "@typings/database";

export type MileageRow = Database["public"]["Tables"]["mileage_logs"]["Row"];
export type FuelPayment = Database["public"]["Tables"]["fuel_payments"]["Row"];

export type FuelCar = { has_car: boolean; car_plate: string | null; car_model: string | null; fuel_per_100: number | null; fuel_type: string | null };

export type FuelPeriod = "day" | "week" | "month";
export type FuelRange = { from: string; to: string; label: string; workdays: number };

// Bir sorğuda: maşın, dövrün yürüşləri və ödənişləri, bu günün sətri, qiymətlər, ayın balansı (alınan − sərf)
export type FuelData = {
  car: FuelCar | null;
  rows: MileageRow[];
  today: MileageRow | null;
  prices: { petrol: number | null; diesel: number | null };
  payments: FuelPayment[];
  month: { cost: number; paid: number };
};

export type StepKind = "start" | "end";
export type FuelTotals = { km: number; liters: number; cost: number; days: number };

// FlashList sətirləri
export type FuelListRow =
  | { kind: "title"; key: string; title: string; badge?: string }
  | { kind: "empty"; key: string; text: string }
  | { kind: "payment"; key: string; payment: FuelPayment }
  | { kind: "day"; key: string; row: MileageRow; got: number; maxKm: number };
