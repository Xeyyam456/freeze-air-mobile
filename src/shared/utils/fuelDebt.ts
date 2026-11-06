import type { DayCoverage, FuelData } from "@typings/fuel";

const EPS = 0.005;
// Diskdəki köhnə keşdə (əvvəlki versiya) month.days / month.pays olmaya bilər: ?? [] — çökməsin, təzə sorğu gələnə qədər boş

// Ayın pulları günlərə KÖHNƏDƏN YENİYƏ paylanır (şirkət çox vaxt bir neçə günün pulunu birdən verir: 06.11-də verilən
// 45.66 ₼ 02.11 + 06.11-i bağlayır). "Almadım" deyilən ödəniş sayılmır. Nəticə: gün → { sərf, ödənilən }
export function coverage(month: FuelData["month"]): Map<string, DayCoverage> {
  let pool = (month.pays ?? []).filter((p) => p.status !== "disputed").reduce((n, p) => n + Number(p.amount), 0);
  const out = new Map<string, DayCoverage>();
  for (const d of [...(month.days ?? [])].filter((x) => x.cost != null).sort((a, b) => a.day.localeCompare(b.day))) {
    const cost = Number(d.cost);
    const covered = Math.min(pool, cost);
    pool = Math.max(0, pool - covered);
    out.set(d.day, { km: d.km ?? 0, cost, covered });
  }
  return out;
}

// Ödənilməmiş (və ya yarımçıq) günlər, köhnədən yeniyə
export const unpaidDays = (cov: Map<string, DayCoverage>) =>
  [...cov].filter(([, c]) => c.cost - c.covered > EPS).map(([day, c]) => ({ day, ...c, due: c.cost - c.covered }));

// Borclar (ayın içində): şirkətin sənə borcu və ya sənin artıq aldığın (şirkətə borcun). "Almadım" ödənişləri sayılmır
export function debts(month: FuelData["month"]) {
  const paid = (month.pays ?? []).filter((p) => p.status !== "disputed").reduce((n, p) => n + Number(p.amount), 0);
  const diff = Math.round((paid - month.cost) * 100) / 100;
  return { paid, company: diff < 0 ? -diff : 0, mine: diff > 0 ? diff : 0 };
}

// Günün ödəniş vəziyyəti (sətirdə yazı)
export function dayPayState(c: DayCoverage | undefined): "paid" | "partial" | "unpaid" | null {
  if (!c || c.cost <= EPS) return null;
  if (c.cost - c.covered <= EPS) return "paid";
  return c.covered > EPS ? "partial" : "unpaid";
}
