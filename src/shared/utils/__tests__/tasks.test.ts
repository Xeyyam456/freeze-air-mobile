import { describe, expect, it } from "vitest";
import { buildRows, filesByGroup, flipDone, placeOf, setNote, weekDays } from "@shared/utils/helpers/tasks";
import type { DayTasks, Task } from "@typings/tasks";

const task = (id: number, employee_id: number, group_id: string | null, done = false, cancelled = false) =>
  ({ id, employee_id, group_id, done, note: null, cancelled_at: cancelled ? "2026-11-09T08:00:00Z" : null }) as Task;
const emp = (id: number) => ({ id, full_name: `Usta ${id}`, photo_url: null });

describe("placeOf", () => {
  const at = (p: object) => ({ stores: null, companies: null, place_text: null, ...p });
  it("mağaza → sabit məkan → yazılan yer → silinib", () => {
    expect(placeOf(at({ stores: { code: "ARZ-045", name: "Nərimanov", companies: { name: "Araz" } } }))).toEqual({ place: "Araz · ARZ-045 Nərimanov", placeKind: "store" });
    expect(placeOf(at({ companies: { name: "Port Baku" } }))).toEqual({ place: "Port Baku", placeKind: "company" });
    expect(placeOf(at({ place_text: "Ev" }))).toEqual({ place: "Ev", placeKind: "text" });
    expect(placeOf(at({}))).toEqual({ place: "Yer silinib", placeKind: "text" });
  });
});

describe("filesByGroup — qrupun faylları hər üzvün kartında", () => {
  it("qrup üzrə toplanır, tək tapşırıq ayrıca; naməlum növ sayılmır", () => {
    const row = (id: number, group_id: string | null, ...kinds: string[]) => ({ id, group_id, work_logs: { work_files: kinds.map((kind) => ({ kind })) } });
    const by = filesByGroup([row(1, "g", "photo", "act"), row(2, "g", "photo", "video", "pdf"), row(3, null, "act"), { id: 4, group_id: null, work_logs: null }]);
    expect(by.get("g")).toEqual({ act: 1, photo: 2, video: 1 });
    expect(by.get("t3")).toEqual({ act: 1, photo: 0, video: 0 });
    expect(by.get("t4")).toEqual({ act: 0, photo: 0, video: 0 });
  });
});

describe("optimistik dəyişikliklər (bazadakı qaydanın eyni)", () => {
  const day: DayTasks = { employees: [], tasks: [task(1, 1, "g", false), task(2, 2, "g", false), task(3, 3, "g", false, true), task(4, 1, null)] };

  it("flipDone: qrupun canlı üzvlərinin hamısı; geri alınan dəyişmir; giriş dəyişmir", () => {
    const d = flipDone(day, { id: 1, group_id: "g" }, true);
    expect(d.tasks.map((t) => t.done)).toEqual([true, true, false, false]);
    expect(day.tasks[0].done).toBe(false);
    expect(flipDone(day, { id: 4, group_id: null }, true).tasks.map((t) => t.done)).toEqual([false, false, false, true]);
  });

  it("setNote: yalnız qrupun GÖRÜLMÜŞ üzvlərinə", () => {
    const d = setNote(flipDone(day, { id: 1, group_id: "g" }, true), { id: 1, group_id: "g" }, "Freon dolduruldu");
    expect(d.tasks.map((t) => t.note)).toEqual(["Freon dolduruldu", "Freon dolduruldu", null, null]);
    const one = setNote({ ...day, tasks: [task(1, 1, "g", true), task(2, 2, "g", false)] }, { id: 1, group_id: "g" }, "x");
    expect(one.tasks.map((t) => t.note)).toEqual(["x", null]);
  });
});

describe("weekDays — həftə zolağı", () => {
  it("qrup bir tapşırıq; mənimkilər ayrıca; boş gün 0", () => {
    const rows = [
      { task_date: "2026-11-09", employee_id: 1, group_id: null }, { task_date: "2026-11-09", employee_id: 1, group_id: "g" },
      { task_date: "2026-11-09", employee_id: 2, group_id: "g" }, { task_date: "2026-11-09", employee_id: 3, group_id: null },
      { task_date: "2026-11-10", employee_id: 2, group_id: null },
    ];
    expect(weekDays(["2026-11-09", "2026-11-10", "2026-11-11"], rows, 1)).toEqual([
      { day: "2026-11-09", total: 3, mine: 2 }, { day: "2026-11-10", total: 1, mine: 0 }, { day: "2026-11-11", total: 0, mine: 0 },
    ]);
  });
});

describe("buildRows — Tapşırıqlar ekranının sətirləri", () => {
  const data: DayTasks = {
    employees: [emp(1), emp(2), emp(3)],
    tasks: [task(1, 1, "g"), task(2, 2, "g"), task(3, 3, "g", false, true), task(4, 1, null), task(5, 2, null), task(6, 3, null, false, true)],
  };

  it("Mənim → qrup yoldaşları (geri alınan xaric) → Komanda (geri alınan xaric)", () => {
    const rows = buildRows(data, 1);
    expect(rows.map((r) => r.key)).toEqual(["t-mine", "m1", "m4", "t-team", "e2"]);
    const m1 = rows.find((r) => r.key === "m1");
    expect(m1?.kind === "mine" && m1.mates.map((e) => e.id)).toEqual([2]);
    const e2 = rows.find((r) => r.key === "e2");
    expect(e2?.kind === "team" && e2.tasks.map((t) => t.id)).toEqual([2, 5]);
  });

  it("tapşırığım yoxdursa boş mətn; məlumat yoxdursa heç nə", () => {
    expect(buildRows({ employees: [], tasks: [] }, 1).map((r) => r.kind)).toEqual(["title", "empty"]);
    expect(buildRows(undefined, 1)).toEqual([]);
  });
});
