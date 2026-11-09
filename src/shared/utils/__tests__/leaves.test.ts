import { describe, expect, it } from "vitest";
import { buildLeaveRows, filterCounts, isActive, leaveRange, leaveStats, leaveWorkdays, stamp } from "@shared/utils/helpers/leaves";
import type { MyLeave } from "@typings/leaves";

const TODAY = "2026-11-09";
const leave = (id: number, date_from: string, date_to: string, status: string) => ({ id, employee_id: 1, date_from, date_to, status }) as MyLeave;

describe("yazılar və günlər", () => {
  it.each([
    ["2026-11-09", "2026-11-09", 1], ["2026-11-07", "2026-11-09", 2], ["2026-11-08", "2026-11-08", 0],
    ["2026-11-02", "2026-11-15", 12], ["2026-10-30", "2026-11-02", 3], ["2026-02-27", "2026-03-02", 3],
  ])("leaveWorkdays %s – %s → %i (bazar sayılmır)", (date_from, date_to, n) => expect(leaveWorkdays({ date_from, date_to })).toBe(n));

  it("leaveRange: il hər iki tarixdə", () => {
    expect(leaveRange({ date_from: "2026-10-21", date_to: "2026-10-21" })).toBe("21.10.2026");
    expect(leaveRange({ date_from: "2026-12-30", date_to: "2027-01-02" })).toBe("30.12.2026 – 02.01.2027");
  });

  it("stamp: Bakı vaxtı", () => {
    expect(stamp("2026-10-21T14:41:00Z")).toBe("21.10.2026 18:41");
    expect(stamp("2026-12-31T20:05:00Z")).toBe("01.01.2027 00:05");
  });
});

describe("leaveStats — xülasə", () => {
  it("bu il, bu ay, gözləyən, növbəti", () => {
    const all = [
      leave(1, "2026-11-02", "2026-11-04", "approved"), leave(2, "2026-11-07", "2026-11-09", "approved"),
      leave(3, "2026-10-05", "2026-10-06", "approved"), leave(4, "2026-11-12", "2026-11-12", "rejected"),
      leave(5, "2026-11-25", "2026-11-25", "pending"), leave(6, "2026-11-18", "2026-11-18", "approved"), leave(7, "2026-11-16", "2026-11-17", "approved"),
    ];
    expect(leaveStats(all, TODAY)).toMatchObject({ year: 10, month: 8, pending: 1, next: { id: 7 } });
  });

  it("ayın sonundan o tərəfə keçən icazə növbəti ayın günlərini saymır (30 və 28 günlük ay)", () => {
    expect(leaveStats([leave(1, "2026-11-28", "2026-12-05", "approved")], TODAY).month).toBe(2); // 28 şənbə, 30 bazar ertəsi
    expect(leaveStats([leave(1, "2026-02-26", "2026-03-04", "approved")], "2026-02-10").month).toBe(3); // 26, 27, 28
    expect(leaveStats([leave(1, "2026-10-29", "2026-11-03", "approved")], TODAY).month).toBe(2);
  });

  it("ilin sərhədi", () => {
    expect(leaveStats([leave(1, "2025-12-29", "2026-01-03", "approved")], "2026-01-05").year).toBe(3);
  });
});

describe("İcazələrim siyahısı", () => {
  const all = [
    leave(1, "2026-11-20", "2026-11-21", "pending"), leave(2, "2026-11-05", "2026-11-09", "approved"),
    leave(3, "2026-10-01", "2026-10-02", "approved"), leave(4, "2026-10-20", "2026-10-20", "rejected"),
    leave(5, "2026-11-01", "2026-11-02", "cancelled"),
  ];

  it("isActive: gözləyən və ya bu gün/sonra bitən təsdiqli", () => {
    expect(all.map((l) => isActive(l, TODAY))).toEqual([true, true, false, false, false]);
  });

  it("buildLeaveRows: aktivlər tarixə görə, sonra tarixçə ay başlıqları ilə", () => {
    const rows = buildLeaveRows(all, TODAY, "all");
    expect(rows.map((r) => r.key)).toEqual(["t-active", "a2", "a1", "t-past", "filters", "m2026-10", "p3", "p4", "m2026-11", "p5"]);
    const month = rows.find((r) => r.key === "m2026-10");
    expect(month?.kind === "month" && month.label).toBe("Oktyabr 2026");
  });

  it("süzgəc və boş vəziyyətlər", () => {
    expect(buildLeaveRows(all, TODAY, "rejected").filter((r) => r.kind === "leave" && !r.active).map((r) => r.key)).toEqual(["p4"]);
    const none = buildLeaveRows([], TODAY, "all").filter((r) => r.kind === "empty");
    expect(none.map((r) => r.kind === "empty" && r.text)).toEqual(["İndi aktiv və ya gözləyən icazən yoxdur.", "Hələ keçmiş icazən yoxdur."]);
    const noMatch = buildLeaveRows([leave(3, "2026-10-01", "2026-10-02", "approved")], TODAY, "cancelled").find((r) => r.key === "e-past");
    expect(noMatch?.kind === "empty" && noMatch.text).toBe("Bu süzgəcə uyğun sorğu yoxdur.");
  });

  it("filterCounts: yalnız tarixçə", () => {
    expect(filterCounts(all, TODAY)).toEqual({ all: 3, approved: 1, rejected: 1, cancelled: 1 });
  });
});
