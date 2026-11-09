import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { dayHeading, feedRows, feedWhen, norm, searchPosts } from "@shared/utils/helpers/feed";
import type { FeedPost } from "@typings/feed";

// "İndi": 2026-11-09 12:00 Bakı (bazar ertəsi)
beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-09T08:00:00Z"));
});
afterAll(() => vi.useRealTimers());

const post = (logId: number, at: string, p: Partial<FeedPost> = {}) =>
  ({ logId, at, place: "", company: null, name: "", partners: [], description: "", ...p }) as FeedPost;

describe("norm — Azərbaycan hərfləri", () => {
  it.each([
    ["Əlizadə", "elizade"], ["İlqar", "ilqar"], ["İSMAYILLI", "ismayilli"], ["Şəki", "seki"], ["Göygöl", "goygol"], ["Ağcabədi", "agcabedi"], ["Üzüm Çay", "uzum cay"],
  ])("%s → %s", (s, want) => expect(norm(s)).toBe(want));
});

describe("gün başlığı və vaxt", () => {
  it.each([
    ["2026-11-09T05:02:00Z", "Bu gün 09:02"],
    ["2026-11-08T20:30:00Z", "Bu gün 00:30"],
    ["2026-11-08T10:00:00Z", "Dünən 14:00"],
    ["2026-11-06T10:02:00Z", "Cümə, 6 noyabr 14:02"],
  ])("feedWhen(%s) → %s", (t, want) => expect(feedWhen(t)).toBe(want));

  it.each([
    ["2026-11-09T05:00:00Z", "Bu gün"], ["2026-11-08T19:59:00Z", "Dünən"], ["2026-11-07T10:00:00Z", "Şənbə, 7 noyabr"],
  ])("dayHeading(%s) → %s", (t, want) => expect(dayHeading(t)).toBe(want));
});

describe("feedRows — hər günün başlığı və sayı", () => {
  it("gün başlığı + paylaşımlar, Bakı gününə görə", () => {
    const rows = feedRows([post(1, "2026-11-09T05:00:00Z"), post(2, "2026-11-08T21:00:00Z"), post(3, "2026-11-08T10:00:00Z")], "iş");
    expect(rows.map((r) => (r.kind === "day" ? r.label : r.post.logId))).toEqual(["Bu gün · 2 iş", 1, 2, "Dünən · 1 iş", 3]);
    expect(rows.map((r) => r.key)).toEqual(["d2026-11-09", "p1", "p2", "d2026-11-08", "p3"]);
  });
  it("boş lent", () => expect(feedRows([], "akt")).toEqual([]));
});

describe("searchPosts — bütün sözlər tapılmalıdır", () => {
  const posts = [
    post(1, "2026-11-06T10:00:00Z", { place: "Araz · ARZ-045 Nərimanov", company: "Araz", name: "İsmayılov İlqar", description: "Freon dolduruldu" }),
    post(2, "2026-11-09T05:00:00Z", { place: "Port Baku", name: "Quliyev Anar", description: "Filtr təmizləndi" }),
  ];
  const ids = (q: string) => searchPosts(posts, q).map((p) => p.logId);
  it.each([
    ["nerimanov", [1]], ["ilqar", [1]], ["İLQAR freon", [1]], ["temizlendi", [2]], ["araz", [1]],
    ["6 noyabr", [1]], ["2026-11-09", [2]], ["bu gün", [2]], ["", [1, 2]], ["ilqar filtr", []],
  ] as const)("%j → %j", (q, want) => expect(ids(q)).toEqual(want));
});
