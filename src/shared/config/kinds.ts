import type { CompanyKind } from "@typings/companies";

// Şirkətlər və marketlər eyni ekranları işlədir, yalnız sözlər fərqlənir (web `lib/kinds` ilə eyni məna).
// Sabit məkan (filialsız obyekt) yalnız şirkətdə var: marketin mağazası yoxdursa sadəcə "0 mağaza"
export const KIND = {
  company: {
    section: "Şirkətlər", sub: "Müqavilə bağlanan şirkətlər", kicker: "ŞİRKƏTLƏR", count: "şirkət", one: "Şirkət", searchTop: "Ad, ünvan, əlaqə şəxsi...", match: "uyğun şirkət",
    unit: "Filial", unitLow: "filial", units: "Filiallar", unitsTotal: "Filial cəmi", unitSearch: "Filial: kod, ad, ünvan...",
    empty: "Hələ şirkət əlavə olunmayıb.", loadError: "Şirkətlər yüklənmədi.", oneError: "Şirkət yüklənmədi.", missing: "Şirkət tapılmadı.",
  },
  market: {
    section: "Mağazalar", sub: "Müqavilə bağladığımız mağazalar", kicker: "MARKETLƏR", count: "market", one: "Market", searchTop: "Ad, ünvan, əlaqə şəxsi...", match: "uyğun market",
    unit: "Mağaza", unitLow: "mağaza", units: "Mağazalar", unitsTotal: "Mağaza cəmi", unitSearch: "Mağaza: kod, ad, ünvan...",
    empty: "Hələ market əlavə olunmayıb.", loadError: "Marketlər yüklənmədi.", oneError: "Market yüklənmədi.", missing: "Market tapılmadı.",
  },
} as const;

// Sabit məkan: yalnız mağazası/filialı olmayan ŞİRKƏT
export const isFixed = (kind: CompanyKind, units: number) => kind === "company" && units === 0;
