import { describe, expect, it } from "vitest";
import { filterCompanies, hasCoords, hasLocation, initial, mapsUrl, pct, shortDate, telUrl, wazeUrl } from "@shared/utils/helpers/companies";
import type { Company } from "@typings/companies";

const company = (id: number, name: string, p: Partial<Company> = {}) =>
  ({ id, name, phone: null, address: null, contact_person: null, logo_url: null, lat: null, lng: null, stores: [], ...p }) as Company;

describe("filterCompanies — ad, ünvan, əlaqə şəxsi, telefon", () => {
  const list = [
    company(1, "Araz Supermarket", { address: "Nərimanov r., Atatürk pr. 5", contact_person: "İlqar Məmmədov", phone: "+994 12 000 11 22" }),
    company(2, "Port Baku", { address: "Neftçilər pr. 153" }),
    company(3, "Şəki Hotel"),
  ];
  const ids = (q: string) => filterCompanies(list, q).map((c) => c.id);
  it.each([
    ["araz", [1]], ["nerimanov", [1]], ["ilqar", [1]], ["MƏMMƏDOV", [1]], ["000 11", [1]], ["neftciler", [2]],
    ["seki", [3]], ["pr", [1, 2]], ["araz neftçilər", []], ["   ", [1, 2, 3]],
  ] as const)("%j → %j", (q, want) => expect(ids(q)).toEqual(want));
});

describe("naviqasiya (web lib/navigation ilə eyni)", () => {
  const at = { name: "A", address: "x", lat: 40.4093, lng: 49.8671 };
  const addr = { name: "B", address: "Nərimanov 5", lat: null, lng: null };
  const none = { name: "C", address: null, lat: null, lng: null };

  it("koordinat varsa dəqiq nöqtə, yoxsa ünvan", () => {
    expect(mapsUrl(at)).toBe("https://www.google.com/maps/dir/?api=1&destination=40.4093%2C49.8671&travelmode=driving");
    expect(mapsUrl(addr)).toBe(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Nərimanov 5")}&travelmode=driving`);
    expect(wazeUrl(at)).toBe("https://waze.com/ul?ll=40.4093,49.8671&navigate=yes");
    expect(wazeUrl(addr)).toBe(`https://waze.com/ul?q=${encodeURIComponent("Nərimanov 5")}&navigate=yes`);
  });

  it("hasCoords / hasLocation: 0 koordinatı da koordinatdır", () => {
    expect([hasCoords(at), hasCoords(none), hasCoords({ lat: 0, lng: 0 })]).toEqual([true, false, true]);
    expect([hasLocation(at), hasLocation(addr), hasLocation(none)]).toEqual([true, true, false]);
  });

  it("telUrl: boşluq və mötərizə silinir, + qalır", () => {
    expect(telUrl("+994 (12) 000-11-22")).toBe("tel:+994120001122");
  });
});

describe("kiçik yazılar", () => {
  it("shortDate / pct / initial", () => {
    expect([shortDate("2026-11-09"), shortDate("2026-06-01"), shortDate("2026-07-15")]).toEqual(["9 noy", "1 iyn", "15 iyl"]);
    expect([pct(1, 3), pct(2, 3), pct(5, 0), pct(3, 3)]).toEqual([33, 67, 0, 100]);
    expect([initial("  araz"), initial("İlqar"), initial("əli")]).toEqual(["A", "İ", "Ə"]);
  });
});
