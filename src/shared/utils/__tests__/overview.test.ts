import { describe, expect, it } from "vitest";
import { buildOverview, type OverviewRow } from "@shared/utils/helpers/overview";

const store = (code: string, name: string) => ({ code, name, companies: { name: "Araz" } });
const row = (work_date: string, p: Partial<OverviewRow> = {}): OverviewRow => ({ work_date, place_text: null, stores: null, companies: null, ...p });

describe("buildOverview — Panel icmalı", () => {
  const TODAY = "2026-11-03";
  const rows = [
    row("2026-10-28", { stores: store("A-1", "Nərimanov") }), // keçən ay: son 7 günə düşür, aya yox
    row("2026-11-01", { stores: store("A-1", "Nərimanov") }),
    row("2026-11-01", { companies: { name: "Port Baku" } }),
    row("2026-11-03", { stores: store("A-1", "Nərimanov") }),
    row("2026-11-03", { place_text: "Ev, Yasamal" }),
    row("2026-11-03"),
  ];
  const o = buildOverview(rows, TODAY, 12);

  it("ayın bütün günləri (noyabr 30), saylar günə görə", () => {
    expect(o.month).toHaveLength(30);
    expect(o.month.slice(0, 3)).toEqual([{ day: "2026-11-01", count: 2 }, { day: "2026-11-02", count: 0 }, { day: "2026-11-03", count: 3 }]);
  });

  it("son 7 gün bu gün daxil, ay sərhədini keçir", () => {
    expect(o.week.map((d) => d.day)).toEqual(["2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31", "2026-11-01", "2026-11-02", "2026-11-03"]);
    expect(o.week.map((d) => d.count)).toEqual([1, 0, 0, 0, 2, 0, 3]);
  });

  it("ay cəmi, keçən ay, aktiv günlər", () => {
    expect([o.monthTotal, o.prevTotal, o.activeDays]).toEqual([5, 12, 2]);
  });

  it("yerlər yalnız bu ay, çoxdan aza; yer yoxdursa —", () => {
    expect(o.places).toEqual([
      { name: "A-1 Nərimanov", count: 2 }, { name: "Port Baku", count: 1 }, { name: "Ev, Yasamal", count: 1 }, { name: "—", count: 1 },
    ]);
  });

  it("ən çox 5 yer", () => {
    const many = Array.from({ length: 7 }, (_, i) => row("2026-11-02", { place_text: `Yer ${i}` }));
    expect(buildOverview(many, TODAY, 0).places).toHaveLength(5);
  });

  it("boş ay", () => {
    expect(buildOverview([], "2026-02-10", 0)).toMatchObject({ monthTotal: 0, activeDays: 0, places: [] });
    expect(buildOverview([], "2026-02-10", 0).month).toHaveLength(28);
  });
});
