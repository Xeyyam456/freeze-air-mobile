export const MAX_ACC = 100; // GPS dəqiqliyi bundan pisdirsə koordinat yazılmır (metr)
export const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright"; // OpenFreeMap: API açarı lazım deyil

// "40.40930, 49.86710" (Google Maps-dən kopyalanan) → koordinat; səhvdirsə null
export function parseCoordinates(input: string): { lat: number; lng: number } | null {
  const m = input.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (!m) return null;
  const lat = Number(m[1]);
  const lng = Number(m[2]);
  return Math.abs(lat) > 90 || Math.abs(lng) > 180 ? null : { lat, lng };
}

// İki nöqtə arası məsafə (metr)
export function meters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const fmtDist = (m: number) => (m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`);
