import type { Announcement, AnnouncementRowItem } from "@typings/announcements";

// Bakı vaxtı (UTC+4): tarix və saat
const BAKU_MS = 4 * 3600_000;
const baku = (iso: string) => new Date(Date.parse(iso) + BAKU_MS).toISOString();
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];

// "22:05"
export const timeText = (iso: string) => baku(iso).slice(11, 16);
// Son 24 saatın elanı: "Yeni"
export const isFresh = (iso: string, now = Date.now()) => now - Date.parse(iso) < 86_400_000;

// "Bu gün", "Dünən", "27 oktyabr" (bu il) / "27 oktyabr 2025"
function dayLabel(day: string, today: string) {
  const diff = Math.round((Date.parse(today) - Date.parse(day)) / 86_400_000);
  if (diff === 0) return "Bu gün";
  if (diff === 1) return "Dünən";
  const text = `${+day.slice(8, 10)} ${MONTHS[+day.slice(5, 7) - 1]}`;
  return day.slice(0, 4) === today.slice(0, 4) ? text : `${text} ${day.slice(0, 4)}`;
}

// FlashList sətirləri: hər gün üçün başlıq, altında elanlar (yenidən köhnəyə). first/last: kart künclərini yuvarlaqlaşdırmaq üçün
export function buildRows(items: Announcement[], now = Date.now()): AnnouncementRowItem[] {
  const today = new Date(now + BAKU_MS).toISOString().slice(0, 10);
  const rows: AnnouncementRowItem[] = [];
  let last = "";
  items.forEach((a, i) => {
    const label = dayLabel(baku(a.created_at).slice(0, 10), today);
    const first = label !== last;
    if (first) rows.push({ kind: "day", key: `d-${label}`, label });
    const next = items[i + 1];
    const lastOfDay = !next || dayLabel(baku(next.created_at).slice(0, 10), today) !== label;
    rows.push({ kind: "item", key: `a-${a.id}`, item: a, first, last: lastOfDay });
    last = label;
  });
  return rows;
}
