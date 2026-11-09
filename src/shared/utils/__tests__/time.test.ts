import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addDays, dayLabel, daysInMonth, durShort, isSunday, mins, monthName, monthStartBaku, prevMonthStart, secs, timeBaku, todayBaku,
  weekdayShort, weekOf, weekRange, weekStart,
} from "@shared/utils/helpers/time";

// Bakı = UTC+4, yay saatı yoxdur. 2026-11-09 bazar ertəsi, 2026-11-08 bazardır
afterEach(() => vi.useRealTimers());
const at = (isoUtc: string) => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(isoUtc));
};

describe("todayBaku / monthStartBaku — gecə yarısı sərhədi", () => {
  it.each([
    ["2026-11-08T19:59:00Z", "2026-11-08"],
    ["2026-11-08T20:00:00Z", "2026-11-09"],
    ["2026-12-31T20:30:00Z", "2027-01-01"],
    ["2026-07-01T10:00:00Z", "2026-07-01"],
  ])("%s → %s", (now, want) => {
    at(now);
    expect(todayBaku()).toBe(want);
  });
  it("ayın 1-i Bakı vaxtı ilə", () => {
    at("2026-10-31T20:00:00Z");
    expect(monthStartBaku()).toBe("2026-11-01");
  });
});

describe("saat və müddət", () => {
  it.each([
    ["2026-11-09T05:02:00Z", "09:02"], ["2026-11-09T20:00:00Z", "00:00"], ["2026-11-09T21:30:00Z", "01:30"],
  ])("timeBaku %s → %s", (t, want) => expect(timeBaku(t)).toBe(want));

  it("mins / secs: tərs sıra 0 verir", () => {
    expect(mins("2026-11-09T05:00:00Z", "2026-11-09T06:05:29Z")).toBe(65);
    expect(mins("2026-11-09T06:00:00Z", "2026-11-09T05:00:00Z")).toBe(0);
    expect(secs("2026-11-09T05:00:00Z", "2026-11-09T05:01:30.900Z")).toBe(90);
  });

  it.each([[0, "1 dəq"], [12, "12 dəq"], [60, "1 saat 0 dəq"], [65, "1 saat 5 dəq"], [545, "9 saat 5 dəq"]])(
    "durShort(%i) → %s", (m, want) => expect(durShort(m)).toBe(want),
  );
});

describe("tarix aritmetikası", () => {
  it("addDays: ay, il və fevral sərhədləri", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2028-03-01", -1)).toBe("2028-02-29");
    expect(addDays("2026-11-09", 0)).toBe("2026-11-09");
  });

  it("daysInMonth / prevMonthStart / monthName", () => {
    expect([daysInMonth("2026-11-09"), daysInMonth("2026-02-10"), daysInMonth("2028-02-10"), daysInMonth("2026-12-01")]).toEqual([30, 28, 29, 31]);
    expect([prevMonthStart("2026-01-15"), prevMonthStart("2026-03-31")]).toEqual(["2025-12-01", "2026-02-01"]);
    expect([monthName("2026-11-09"), monthName("2026-06-01")]).toEqual(["noyabr", "iyun"]);
  });

  it("isSunday", () => {
    expect([isSunday("2026-11-08"), isSunday("2026-11-09")]).toEqual([true, false]);
  });
});

describe("həftə (bazar ertəsindən başlayır)", () => {
  it("weekStart: bazar günü əvvəlki bazar ertəsinə düşür", () => {
    expect(weekStart("2026-11-08")).toBe("2026-11-02");
    expect(weekStart("2026-11-09")).toBe("2026-11-09");
    expect(weekStart("2026-11-01")).toBe("2026-10-26");
  });

  it("weekOf: 7 gün", () => {
    expect(weekOf("2026-10-26")).toEqual(["2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31", "2026-11-01"]);
  });

  it("weekRange: eyni ay və ay dəyişəndə", () => {
    expect(weekRange("2026-11-02")).toBe("2–8 noyabr");
    expect(weekRange("2026-10-26")).toBe("26 oktyabr – 1 noyabr");
  });

  it("dayLabel / weekdayShort", () => {
    expect(dayLabel("2026-11-06")).toBe("Cümə, 6 noyabr");
    expect(dayLabel("2026-11-08")).toBe("Bazar, 8 noyabr");
    expect(weekOf("2026-11-02").map(weekdayShort)).toEqual(["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"]);
  });
});
