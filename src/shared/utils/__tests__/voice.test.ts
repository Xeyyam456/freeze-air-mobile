import { describe, expect, it, vi } from "vitest";
import { claimVoice, fmtMs, releaseVoice, toPeaks } from "@shared/utils/helpers/voice";

describe("fmtMs", () => {
  it("dəqiqə:saniyə", () => {
    expect(fmtMs(0)).toBe("0:00");
    expect(fmtMs(7400)).toBe("0:07");
    expect(fmtMs(83000)).toBe("1:23");
  });
  it("limit yoxdur: saatı da göstərir", () => {
    expect(fmtMs(3723000)).toBe("1:02:03");
  });
  it("mənfi və qırıq dəyər", () => {
    expect(fmtMs(-5)).toBe("0:00");
    expect(fmtMs(1500)).toBe("0:02");
  });
});

describe("toPeaks", () => {
  it("boş nümunədə n sütun, hamısı minimum", () => {
    const p = toPeaks([], 10);
    expect(p).toHaveLength(10);
    expect(p.every((x) => x === 6)).toBe(true);
  });
  it("dB → 0..100: 0 dB = 100, -60 dB və aşağısı = minimum", () => {
    expect(toPeaks([0], 4)).toEqual([100, 100, 100, 100]);
    expect(toPeaks([-160], 4)).toEqual([6, 6, 6, 6]);
    expect(toPeaks([-30], 2)).toEqual([50, 50]);
  });
  it("çox nümunə n sütuna ortalanır, sıra qorunur", () => {
    const p = toPeaks([-60, -60, 0, 0], 2);
    expect(p).toEqual([6, 100]);
  });
  it("az nümunə təkrarlanır", () => {
    expect(toPeaks([0, -60], 4)).toEqual([100, 100, 6, 6]);
  });
});

describe("claimVoice", () => {
  it("yeni səs başlayanda əvvəlkini dayandırır, özünü yox", () => {
    const a = vi.fn();
    const b = vi.fn();
    claimVoice(a);
    claimVoice(a);
    expect(a).not.toHaveBeenCalled();
    claimVoice(b);
    expect(a).toHaveBeenCalledTimes(1);
    releaseVoice(b);
    claimVoice(a);
    expect(b).not.toHaveBeenCalled();
    releaseVoice(a);
  });
});
