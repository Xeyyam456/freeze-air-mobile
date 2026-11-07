import type { Company, NavPlace } from "@typings/companies";

const fold = (s: string) => s.toLocaleLowerCase("az").replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g");

// Axtarış: ad, ünvan, əlaqə şəxsi, telefon (ə/ı/ö/ü/ş/ç/ğ yumşaldılır)
export function filterCompanies(list: Company[], q: string): Company[] {
  const words = fold(q.trim()).split(/\s+/).filter(Boolean);
  if (!words.length) return list;
  return list.filter((c) => { const hay = fold(`${c.name} ${c.address ?? ""} ${c.contact_person ?? ""} ${c.phone ?? ""}`); return words.every((w) => hay.includes(w)); });
}

export const hasCoords = (p: { lat: number | null; lng: number | null }) => p.lat != null && p.lng != null;
export const telUrl = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
// Koordinat varsa dəqiq nöqtə, yoxsa ünvan (web `lib/navigation` ilə eyni)
const target = (p: NavPlace) => (hasCoords(p) ? `${p.lat},${p.lng}` : p.address ?? "");
export const hasLocation = (p: NavPlace) => hasCoords(p) || !!p.address;
export const mapsUrl = (p: NavPlace) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target(p))}&travelmode=driving`;
export const wazeUrl = (p: NavPlace) => (hasCoords(p) ? `https://waze.com/ul?ll=${p.lat},${p.lng}&navigate=yes` : `https://waze.com/ul?q=${encodeURIComponent(p.address ?? "")}&navigate=yes`);
const SHORT = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek"];
export const shortDate = (day: string) => `${Number(day.slice(8, 10))} ${SHORT[Number(day.slice(5, 7)) - 1]}`;
export const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0);
export const initial = (name: string) => name.trim().charAt(0).toUpperCase();
