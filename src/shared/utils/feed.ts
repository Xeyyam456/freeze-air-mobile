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
