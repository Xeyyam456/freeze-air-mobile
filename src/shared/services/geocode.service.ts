const BASE = "https://nominatim.openstreetmap.org";
const HEADERS = { "User-Agent": "FreezeAirMobile/1.0", "Accept-Language": "az" };

// Koordinat → ünvan (Nominatim reverse); tapılmasa null
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const res = await fetch(`${BASE}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=0`, { headers: HEADERS });
  if (!res.ok) throw new Error("Ünvan tapılmadı");
  const j = (await res.json()) as { display_name?: string };
  return j.display_name ?? null;
}

// Ünvan → koordinat (Nominatim search): yalnız ünvanı olan, koordinatı olmayan yeri xəritədə göstərmək üçün
export async function searchAddress(q: string): Promise<{ lat: number; lng: number } | null> {
  const res = await fetch(`${BASE}/search?format=jsonv2&limit=1&q=${encodeURIComponent(q)}`, { headers: HEADERS });
  if (!res.ok) throw new Error("Ünvan tapılmadı");
  const j = (await res.json()) as { lat: string; lon: string }[];
  return j[0] ? { lat: Number(j[0].lat), lng: Number(j[0].lon) } : null;
}
