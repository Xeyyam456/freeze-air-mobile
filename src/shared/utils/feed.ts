import { dayLabel, timeBaku, todayBaku, addDays } from "@shared/utils/time";
import type { FeedPost } from "@typings/feed";

// Azərbaycan hərflərini sadələşdir ("İzmir" ~ "izmir"), axtarış üçün
export const norm = (s: string) => s.toLocaleLowerCase("az").replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g");

// Paylaşımın Bakı tarixi (YYYY-MM-DD)
const bakuDay = (iso: string) => new Date(Date.parse(iso) + 4 * 3600_000).toISOString().slice(0, 10);

// "Bu gün 18:13" / "Dünən 09:40" / "Cümə, 6 noyabr 14:02"
export function feedWhen(iso: string) {
  const day = bakuDay(iso);
  const today = todayBaku();
  const label = day === today ? "Bu gün" : day === addDays(today, -1) ? "Dünən" : dayLabel(day);
  return `${label} ${timeBaku(iso)}`;
}

// Axtarış: yer, şirkət, usta adı, yazı və tarix yazısı üzrə (bütün sözlər tapılmalıdır)
export function searchPosts(posts: FeedPost[], query: string) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return posts;
  return posts.filter((p) => {
    const hay = norm(`${p.place} ${p.company ?? ""} ${p.name} ${p.description} ${feedWhen(p.at)} ${bakuDay(p.at)}`);
    return words.every((w) => hay.includes(w));
  });
}

// Lentdə gün başlığı (WhatsApp kimi): "Bu gün", "Dünən", sonra "Şənbə, 7 noyabr"
export function dayHeading(iso: string) {
  const day = bakuDay(iso);
  const today = todayBaku();
  return day === today ? "Bu gün" : day === addDays(today, -1) ? "Dünən" : dayLabel(day);
}

// Lent sətirləri: hər günün əvvəlində başlıq ("Bu gün · 3 iş"), sonra həmin günün paylaşımları (yeni üstdə)
export type FeedRow = { key: string; kind: "day"; label: string } | { key: string; kind: "post"; post: FeedPost };
export function feedRows(posts: FeedPost[], unit: string): FeedRow[] {
  const rows: FeedRow[] = [];
  let i = 0;
  while (i < posts.length) {
    const day = bakuDay(posts[i].at);
    let j = i;
    while (j < posts.length && bakuDay(posts[j].at) === day) j++;
    rows.push({ key: `d${day}`, kind: "day", label: `${dayHeading(posts[i].at)} · ${j - i} ${unit}` });
    for (const p of posts.slice(i, j)) rows.push({ key: `p${p.logId}`, kind: "post", post: p });
    i = j;
  }
  return rows;
}
