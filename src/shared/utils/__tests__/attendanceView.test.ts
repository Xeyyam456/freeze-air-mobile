import { describe, expect, it } from "vitest";
import { countToday, durationText, fullDate, monthLead, monthTitle, shiftMonth, todayBadge, weekdayName } from "@shared/utils/attendanceView";
import { presenceView, workedSeconds } from "@shared/utils/presence";
import type { DayStatus, MonthAttendance, Presence } from "@typings/attendance";

const T = (hm: string) => `2026-11-09T${hm}:00Z`; // Bakı = UTC+4: "05:02" → 09:02
const pres = (sessions: { in: string; out: string | null }[], minutes = 0): Presence => ({
  in: sessions[0].in, out: sessions.every((s) => s.out) ? sessions[sessions.length - 1].out : null, sessions, minutes,
});
const att = (status: DayStatus, presence: Presence | null = null, pendingLeave = 0): MonthAttendance => ({
  workdays: 0, present: 0, leave: 0, absent: 0, leaveTimes: 0, extra: 0, today: { status, presence }, pendingLeave,
});

describe("ay və tarix yazıları", () => {
  it("shiftMonth il sərhədini keçir", () => {
    expect(shiftMonth("2026-01", -1)).toBe("2025-12");
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2026-11", 0)).toBe("2026-11");
  });

  it("monthTitle, fullDate, weekdayName", () => {
    expect(monthTitle("2026-11")).toBe("Noyabr 2026");
    expect(fullDate("2026-11-09")).toBe("09.11.2026");
    expect(weekdayName("2026-11-08")).toBe("Bazar");
    expect(weekdayName("2026-11-09")).toBe("Bazar ertəsi");
  });

  it("monthLead: ayın 1-i bazar ertəsindən neçə gün sonradır", () => {
    expect(monthLead("2026-11")).toBe(6); // 1 noyabr bazardır
    expect(monthLead("2026-06")).toBe(0); // 1 iyun bazar ertəsidir
  });

  it("durationText", () => {
    expect(durationText(pres([{ in: T("05:00"), out: null }], 0))).toBe("");
    expect(durationText(pres([{ in: T("05:00"), out: T("07:05") }], 125))).toBe("2 saat 5 dəq");
  });
});

describe("countToday", () => {
  it("ustaları bu günkü vəziyyətə görə sayır", () => {
    const list = [
      att("present", pres([{ in: T("05:00"), out: null }])),
      att("present", pres([{ in: T("05:00"), out: T("13:00") }])),
      att("leave", null, 2), att("pending"), att("pending"), att("absent"), att("off"),
    ];
    expect(countToday(list)).toEqual({ here: 1, done: 1, leave: 1, missing: 2, absent: 1, pending: 2 });
  });
});

describe("todayBadge", () => {
  it("işdədir / işi bitirib (bir və bir neçə seans)", () => {
    expect(todayBadge(att("present", pres([{ in: T("05:02"), out: null }]))).text).toBe("İşdədir · 09:02-dən");
    expect(todayBadge(att("present", pres([{ in: T("05:02"), out: T("14:10") }]))).text).toBe("İşi bitirib · 09:02 – 18:10");
    const two = pres([{ in: T("05:00"), out: T("08:00") }, { in: T("09:15"), out: null }]);
    expect(todayBadge(att("present", two)).text).toBe("İşdədir · 13:15-dən");
    const twoDone = pres([{ in: T("05:00"), out: T("08:00") }, { in: T("09:15"), out: T("14:00") }]);
    expect(todayBadge(att("present", twoDone))).toEqual({ text: "İşi bitirib · 2 seans", tone: "ink" });
  });

  it.each([
    ["leave", "İcazəlidir", "violet"],
    ["off", "Bazar: istirahət", "muted"],
    ["absent", "İşdə olmayıb", "danger"],
    ["pending", "Hələ gəlməyib", "muted"],
  ] as const)("%s", (status, text, tone) => {
    expect(todayBadge(att(status))).toEqual({ text, tone });
  });
});

describe("presenceView — Panel hero kartı", () => {
  const view = (status: "pending" | "present" | "leave" | "absent" | "sunday", sessions: { in: string; out: string | null }[] = []) =>
    presenceView({ status, sessions, leaveId: null });

  it("düymələr vəziyyətə görə", () => {
    expect(view("pending").action?.action).toBe("in");
    expect(view("present", [{ in: T("05:02"), out: null }])).toMatchObject({ label: "İşdəsən", sub: "09:02-dən", action: { action: "out" } });
    expect(view("present", [{ in: T("05:02"), out: T("14:10") }])).toMatchObject({ sub: "09:02 – 18:10", action: { action: "in" } });
    expect(view("leave").action?.action).toBe("giveUpLeave");
    expect(view("absent").action).toBeNull();
    expect(view("sunday").action?.title).toBe("Bazar günü işdəyəm");
  });

  it("workedSeconds: bağlı seanslar + açıq seans indiyə qədər", () => {
    const s = [{ in: T("05:00"), out: T("06:00") }, { in: T("07:00"), out: null }];
    expect(workedSeconds(s, T("07:30"))).toBe(3600 + 1800);
    expect(workedSeconds([], T("07:30"))).toBe(0);
  });
});
