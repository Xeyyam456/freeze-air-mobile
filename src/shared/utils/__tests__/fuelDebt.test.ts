import { describe, expect, it } from "vitest";
import { coverage, dayPayState, debts, unpaidDays } from "@shared/utils/helpers/fuelDebt";
import type { FuelData } from "@typings/fuel";

type Month = FuelData["month"];
const day = (d: string, cost: number | null, km: number | null = 10) => ({ day: d, km, cost });
const pay = (amount: number, status = "confirmed", d = "2026-11-06") => ({ day: d, amount, status });
const month = (days: Month["days"], pays: Month["pays"], cost = 0): Month => ({ cost, days, pays });

describe("coverage — pul günlərə köhnədən yeniyə paylanır", () => {
  it("bir ödəniş bir neçə günü bağlayır (06.11-də 45.66 ₼ → 02.11 + 06.11)", () => {
    const c = coverage(month([day("2026-11-02", 20), day("2026-11-06", 25.66)], [pay(45.66)]));
    expect(dayPayState(c.get("2026-11-02"))).toBe("paid");
    expect(dayPayState(c.get("2026-11-06"))).toBe("paid"); // 45.66 − 20 = 25.659999… → EPS ilə ödənilib
  });

  it("pul çatmayanda köhnə gün tam, sonrakı qismən, ən yeni ödənilməmiş qalır", () => {
    const c = coverage(month([day("2026-11-02", 20), day("2026-11-03", 30), day("2026-11-04", 25)], [pay(35)]));
    expect(c.get("2026-11-02")?.covered).toBe(20);
    expect(c.get("2026-11-03")?.covered).toBe(15);
    expect(c.get("2026-11-04")?.covered).toBe(0);
  });

  it("günlər qarışıq sırada gəlsə də köhnədən yeniyə paylanır", () => {
    const c = coverage(month([day("2026-11-05", 10), day("2026-11-01", 10)], [pay(10)]));
    expect(c.get("2026-11-01")?.covered).toBe(10);
    expect(c.get("2026-11-05")?.covered).toBe(0);
  });

  it("\"Almadım\" (disputed) ödənişi sayılmır", () => {
    const c = coverage(month([day("2026-11-02", 20)], [pay(20, "disputed"), pay(5)]));
    expect(c.get("2026-11-02")?.covered).toBe(5);
  });

  it("sərfi olmayan gün (cost null) siyahıya düşmür, km null → 0", () => {
    const c = coverage(month([day("2026-11-02", null), day("2026-11-03", 12, null)], []));
    expect(c.has("2026-11-02")).toBe(false);
    expect(c.get("2026-11-03")).toEqual({ km: 0, cost: 12, covered: 0 });
  });

  it("artıq pul günün sərfindən çox yazılmır", () => {
    const c = coverage(month([day("2026-11-02", 20)], [pay(100)]));
    expect(c.get("2026-11-02")?.covered).toBe(20);
  });

  it("məbləğ bazadan mətn kimi gəlsə də (numeric) rəqəm sayılır", () => {
    const c = coverage(month([day("2026-11-02", 20)], [pay("12.5" as unknown as number)]));
    expect(c.get("2026-11-02")?.covered).toBe(12.5);
  });

  it("köhnə disk keşi: days / pays yoxdursa çökmür, boş qaytarır", () => {
    expect(coverage({ cost: 0 } as Month).size).toBe(0);
  });
});

describe("unpaidDays", () => {
  it("yalnız qismən və ödənilməmiş günlər, qalan borcla, köhnədən yeniyə", () => {
    const c = coverage(month([day("2026-11-02", 20), day("2026-11-03", 30), day("2026-11-04", 25)], [pay(35)]));
    expect(unpaidDays(c).map((u) => [u.day, u.due])).toEqual([["2026-11-03", 15], ["2026-11-04", 25]]);
  });

  it("hamısı ödənilibsə boş siyahı", () => {
    expect(unpaidDays(coverage(month([day("2026-11-02", 20)], [pay(20)])))).toEqual([]);
  });
});

describe("debts — ayın borcu", () => {
  it("az verilib → şirkətin sənə borcu", () => {
    expect(debts(month([], [pay(50)], 60))).toEqual({ paid: 50, company: 10, mine: 0 });
  });

  it("çox verilib → sənin şirkətə borcun", () => {
    expect(debts(month([], [pay(70)], 60))).toEqual({ paid: 70, company: 0, mine: 10 });
  });

  it("qəpik xətası borc yaratmır (0.1 + 0.2 = 0.3)", () => {
    const d = debts(month([], [pay(0.1), pay(0.2)], 0.3));
    expect([d.company, d.mine]).toEqual([0, 0]);
  });

  it("\"Almadım\" ödənişi verilmiş sayılmır", () => {
    expect(debts(month([], [pay(60, "disputed")], 60))).toEqual({ paid: 0, company: 60, mine: 0 });
  });
});

describe("dayPayState", () => {
  it.each([
    [undefined, null],
    [{ km: 0, cost: 0, covered: 0 }, null],
    [{ km: 0, cost: 0.004, covered: 0 }, null],
    [{ km: 5, cost: 10, covered: 10 }, "paid"],
    [{ km: 5, cost: 10, covered: 9.996 }, "paid"],
    [{ km: 5, cost: 10, covered: 4 }, "partial"],
    [{ km: 5, cost: 10, covered: 0 }, "unpaid"],
  ])("%o → %s", (c, want) => {
    expect(dayPayState(c)).toBe(want);
  });
});
