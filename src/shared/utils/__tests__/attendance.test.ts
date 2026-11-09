import { describe, expect, it } from "vitest";
import { ATTENDANCE_START, dayStatus, isWorkday, monthDays, summarize, toPresence } from "@shared/utils/helpers/attendance";
import type { AttRow, Leave } from "@typings/attendance";

// 2026-11-09 bazar ertəsidir; 2026-11-01 və 2026-11-08 bazardır
const TODAY = "2026-11-09";
const row = (day: string, from: string, to: string | null): AttRow => ({
  employee_id: 1, day, checked_in_at: `${day}T${from}:00Z`, checked_out_at: to ? `${day}T${to}:00Z` : null,
});
const leave = (from: string, to: string, status = "approved"): Leave => ({ id: 1, employee_id: 1, date_from: from, date_to: to, status });
const none = new Set<string>();

describe("isWorkday / monthDays", () => {
  it("bazar iş günü deyil, şənbə iş günüdür (6 günlük həftə)", () => {
    expect(isWorkday("2026-11-08")).toBe(false);
    expect(isWorkday("2026-11-07")).toBe(true);
    expect(isWorkday("2026-11-09")).toBe(true);
  });

  it("ayın günləri: noyabr 30, fevral 28, uzun il fevralı 29", () => {
    const nov = monthDays("2026-11");
    expect([nov.length, nov[0], nov[29]]).toEqual([30, "2026-11-01", "2026-11-30"]);
    expect(monthDays("2026-02")).toHaveLength(28);
    expect(monthDays("2028-02")).toHaveLength(29);
  });
});

describe("toPresence — seanslar", () => {
  it("iki bağlı seans: ilk gəlmə, son getmə, dəqiqələrin cəmi (sıra qarışıq gəlsə də)", () => {
    const p = toPresence([row(TODAY, "09:00", "14:30"), row(TODAY, "05:00", "08:00")]).get(TODAY)!;
    expect(p.in).toBe(`${TODAY}T05:00:00Z`);
    expect(p.out).toBe(`${TODAY}T14:30:00Z`);
    expect(p.minutes).toBe(180 + 330);
    expect(p.sessions).toHaveLength(2);
  });

  it("açıq seans varsa getmə yoxdur, yalnız bağlı seans sayılır", () => {
    const p = toPresence([row(TODAY, "05:00", "08:00"), row(TODAY, "09:00", null)]).get(TODAY)!;
    expect(p.out).toBeNull();
    expect(p.minutes).toBe(180);
  });

  it("günlər ayrı saxlanır", () => {
    expect(toPresence([row("2026-11-02", "05:00", "13:00"), row("2026-11-03", "05:00", null)]).size).toBe(2);
  });
});

describe("dayStatus", () => {
  const pres = toPresence([row("2026-11-06", "05:00", "13:00"), row("2026-11-08", "06:00", "10:00")]);

  it.each([
    ["bazar, gəlməyib → istirahət", "2026-11-01", [], none, "off"],
    ["bazar, gəlib → işdə (əlavə)", "2026-11-08", [], none, "present"],
    ["gələcək gün", "2026-11-10", [], none, "future"],
    ["gələcək icazəli gün", "2026-11-10", [leave("2026-11-10", "2026-11-11")], none, "leave"],
    ["icazə işdə olmaqdan üstündür", "2026-11-06", [leave("2026-11-06", "2026-11-06")], none, "leave"],
    ["gözləyən icazə sayılmır", "2026-11-06", [leave("2026-11-06", "2026-11-06", "pending")], none, "present"],
    ["gəlib", "2026-11-06", [], none, "present"],
    ["admin \"işdə olmayıb\" qeyd edib", "2026-11-05", [], new Set(["2026-11-05"]), "absent"],
    ["keçmiş gün, gəlməyib", "2026-11-05", [], none, "absent"],
    ["bu gün, hələ gəlməyib", TODAY, [], none, "pending"],
    ["davamiyyət başlamazdan əvvəl", "2026-09-30", [], none, "before"],
    ["başlanğıcdan əvvəl, amma qeyd olunub", "2026-09-30", [], new Set(["2026-09-30"]), "absent"],
  ] as const)("%s", (_t, d, leaves, marked, want) => {
    expect(dayStatus(d, TODAY, pres, [...leaves], marked)).toBe(want);
  });

  it("ATTENDANCE_START 2026-10-01-dir", () => {
    expect(ATTENDANCE_START).toBe("2026-10-01");
  });
});

describe("summarize — ayın xülasəsi", () => {
  const pres = toPresence([
    row("2026-11-01", "06:00", "10:00"), // bazar → əlavə
    row("2026-11-02", "05:00", "13:00"), row("2026-11-03", "05:00", "13:00"), row("2026-11-04", "05:00", "13:00"),
  ]);
  const leaves = [leave("2026-11-05", "2026-11-06"), leave("2026-11-20", "2026-11-21", "pending")];

  it("bu ay: iş günü, işdə, icazəli, gəlmədi, bazar işi, bu gün", () => {
    expect(summarize("2026-11", TODAY, pres, leaves)).toEqual({
      workdays: 7, present: 3, leave: 2, absent: 1, extra: 1, leaveTimes: 1, pendingLeave: 1,
      today: { status: "pending", presence: null },
    });
  });

  it("gələcək təsdiqli icazə dəfə sayına düşür, günlərə yox; ay sərhədini kəsən icazə də sayılır", () => {
    const s = summarize("2026-11", TODAY, pres, [leave("2026-10-30", "2026-11-02"), leave("2026-11-20", "2026-11-20")]);
    expect([s.leaveTimes, s.leave]).toEqual([2, 1]);
  });

  it("keçmiş ay: bu gün sahəsi boş, bütün iş günləri sayılır (oktyabr: 27 iş günü)", () => {
    const s = summarize("2026-10", TODAY, new Map(), []);
    expect([s.workdays, s.absent, s.extra, s.today.status]).toEqual([27, 27, 0, "future"]);
  });

  it("davamiyyətdən əvvəlki ay heç nə saymır", () => {
    const s = summarize("2026-09", TODAY, new Map(), []);
    expect([s.workdays, s.absent]).toEqual([0, 0]);
  });
});
