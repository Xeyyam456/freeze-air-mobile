import { describe, expect, it } from "vitest";
import { batchId, calcReturn, emptyDraft, fmt, groupPeople, parseQty, personCounts, requestLabel, requestLine, round2, showQty, unitOf } from "@shared/utils/tools";
import type { Held, MyHold, MyRequest, ToolInfo } from "@typings/tools";

const R410: ToolInfo = { name: "R410", kind: "material", unit: "kq", pack_name: "balon", pack_size: 11.3 };
const PUMP: ToolInfo = { name: "Nasos", kind: "tool", unit: "ədəd", pack_name: null, pack_size: null };
const hold = (quantity: number, tools: ToolInfo | null): MyHold => ({ id: 1, tool_id: 1, quantity, taken_at: "", received_at: "x", disputed_at: null, tools });
const draft = (ret: string, byPack = false, restUsed = true, qty = "") => ({ qty, ret, byPack, restUsed });

describe("miqdar", () => {
  it("round2 / fmt / parseQty (web Depot/utils/quantity ilə eyni)", () => {
    expect([round2(11.3 * 2), fmt(0.1 + 0.2), fmt(11.3 * 3)]).toEqual([22.6, "0,3", "33,9"]);
    expect([parseQty("11,3"), parseQty(" 11.3 ")]).toEqual([11.3, 11.3]);
    expect(parseQty("")).toBeNaN();
  });
  it("showQty: tam balon mötərizədə, yarımçıqda yox; unitOf", () => {
    expect(showQty(22.6, "kq", R410)).toBe("22,6 kq (2 balon)");
    expect(showQty(16.95, "kq", R410)).toBe("16,95 kq");
    expect(showQty(3, "ədəd")).toBe("3 ədəd");
    expect([unitOf(R410), unitOf(PUMP)]).toEqual(["kq", "ədəd"]);
  });
});

describe("calcReturn — alət", () => {
  const h = hold(3, PUMP);
  it.each([
    ["2", true, false], ["3", true, false], ["0", false, false], ["4", false, true], ["1,5", false, false], ["", false, false],
  ])("%s → ok %s, over %s", (qty, ok, over) => {
    const r = calcReturn(h, draft("", false, true, qty));
    expect([r.ok, r.over]).toEqual([ok, over]);
  });
  it("emptyDraft hamısını qaytarır; alət məlumatı yoxdursa ok deyil", () => {
    expect(emptyDraft(h).qty).toBe("3");
    expect(calcReturn(hold(3, null), draft("", false, true, "1")).ok).toBe(false);
  });
});

describe("calcReturn — material (kq / balon)", () => {
  const h = hold(22.6, R410);
  it("1 balon qaytarıram, qalanı işlətdim", () => {
    expect(calcReturn(h, draft("1", true))).toMatchObject({ ok: true, used: 11.3, returned: 11.3, hint: "işlətdim 11,3 kq · qaytarıram 11,3 kq" });
  });
  it("hamısını işlətdim / qalanı məndə qalır", () => {
    expect(calcReturn(h, draft(""))).toMatchObject({ ok: true, used: 22.6, returned: 0 });
    expect(calcReturn(h, draft("5", false, false))).toMatchObject({ ok: true, used: 0, returned: 5, hint: "qaytarıram 5 kq · məndə qalır 17,6 kq" });
    expect(calcReturn(h, draft("", false, false)).ok).toBe(false);
  });
  it("səndə olandan çox ola bilməz", () => {
    expect(calcReturn(h, draft("3", true))).toMatchObject({ ok: false, over: true, hint: "Səndə olandan çox ola bilməz" });
  });
});

describe("sorğular və Kimdə nə var", () => {
  const req = (p: Partial<MyRequest>) => ({ tool_kind: "material", unit: "kq", quantity: null, used: null, returned: null, ...p }) as MyRequest;
  it("requestLabel / requestLine", () => {
    expect(requestLabel(req({ type: "request" }))).toBe("Material istəyi");
    expect(requestLabel(req({ type: "request", tool_kind: "tool" }))).toBe("Alət istəyi");
    expect(requestLabel(req({ type: "return" }))).toBe("Qaytarma");
    expect(requestLine(req({ type: "return", used: 3, returned: 8.3 }))).toBe("işlətdim 3, qaytarıram 8,3 kq");
    expect(requestLine(req({ type: "request", tool_kind: "tool", quantity: 2 }))).toBe("2 ədəd");
  });

  it("groupPeople: özün birinci, qalanlar əlifba ilə (C < Ə < Ş); personCounts", () => {
    const held = (employee_id: number, full_name: string, quantity: number, tools: ToolInfo): Held =>
      ({ id: employee_id * 10 + quantity, tool_id: 1, employee_id, quantity, taken_at: "", employees: { full_name, photo_url: null }, tools });
    const all = [held(3, "Şahin", 1, PUMP), held(2, "Əli", 2, PUMP), held(1, "Cavid", 1, PUMP), held(2, "Əli", 5, R410), held(9, "Mən", 1, PUMP)];
    const people = groupPeople(all, 9);
    expect(people.map((p) => p.name)).toEqual(["Mən", "Cavid", "Əli", "Şahin"]);
    expect(personCounts(people[2])).toEqual({ tools: 2, mats: 1 });
  });

  it("batchId: UUID v4 formatı, hər dəfə fərqli", () => {
    expect(batchId()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(batchId()).not.toBe(batchId());
  });
});
