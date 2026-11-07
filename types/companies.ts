// Şirkətlər və marketlər (yalnız baxış): filiallar (stores) və son işlər
export type CompanyKind = "company" | "market";
export type Company = {
  id: number; name: string; phone: string | null; address: string | null; contact_person: string | null; logo_url: string | null;
  lat: number | null; lng: number | null; stores: { lat: number | null; lng: number | null }[];
};
export type Unit = { id: number; code: string; name: string; address: string | null; phone: string | null; lat: number | null; lng: number | null };
export type PlaceWork = { key: string; day: string; at: string; description: string; names: string[]; unit: string | null };
export type CompanyDetail = { company: Company; units: Unit[] };
export type NavPlace = { name: string; address: string | null; lat: number | null; lng: number | null };

// Yer (filial/mağaza və ya sabit məkanlı şirkət): xəritə və konum düzəltmə üçün
export type PlaceRef = { kind: "store" | "company"; id: number; code?: string; name: string; address: string | null; lat: number | null; lng: number | null };
// Tapılan nöqtə: GPS (acc = dəqiqlik metrlə) və ya əl ilə / xəritədən seçilmiş (manual)
export type PlaceFix = { lat: number; lng: number; acc: number; manual?: boolean };
