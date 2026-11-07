import type { CodeRowItem, ErrorCode } from "@typings/errorCodes";

// Daikin kodlarında simvol sırası: əvvəl rəqəmlər, sonra hərflər (servis kitabçasındakı kimi)
const ORDER = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rank = (ch: string) => { const i = ORDER.indexOf(ch.toUpperCase()); return i < 0 ? ORDER.length : i; };

export function compareCodes(a: string, b: string) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = rank(a[i] ?? "") - rank(b[i] ?? "");
    if (d) return d;
  }
  return 0;
}

// Kitabçada izahı olmayan kod ("Xəta barədə məlumat yoxdur")
export const isNoInfo = (c: ErrorCode) => c.title.trim().toLowerCase().startsWith("xəta barədə məlumat yoxdur");

// Axtarış kod kimidirsə (1–2 simvol, hərf/rəqəm): kodun başlanğıcına görə; yoxsa sözlərə görə (kod + izah + edilecək iş)
export const isCodeQuery = (q: string) => /^[0-9a-z]{1,2}$/i.test(q.trim());

const fold = (s: string) => s.toLocaleLowerCase("az").replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g");

export function filterCodes(codes: ErrorCode[], query: string): ErrorCode[] {
  const q = query.trim();
  if (!q) return codes;
  if (isCodeQuery(q)) return codes.filter((c) => c.code.startsWith(q.toUpperCase()));
  const words = fold(q).split(/\s+/).filter(Boolean);
  return codes.filter((c) => { const hay = fold(`${c.code} ${c.title} ${c.solution ?? ""}`); return words.every((x) => hay.includes(x)); });
}

// Başlıq (hərf + say) + kodlar: ilk simvol dəyişəndə yeni qrup; sətirlər qrup kartının künc vəziyyətini (first/last) bilir
export function toRows(codes: ErrorCode[]): CodeRowItem[] {
  const rows: CodeRowItem[] = [];
  const groups = new Map<string, ErrorCode[]>();
  for (const c of codes) groups.set(c.code[0]?.toUpperCase() ?? "", [...(groups.get(c.code[0]?.toUpperCase() ?? "") ?? []), c]);
  for (const [letter, list] of groups) {
    rows.push({ type: "head", key: `h${letter}`, letter, count: list.length });
    list.forEach((code, i) => rows.push({ type: "code", key: `c${code.id}`, code, first: i === 0, last: i === list.length - 1 }));
  }
  return rows;
}

// "Edilecək iş" mətni addımlara bölünür: sətir sonları və cümlələr (nöqtədən sonra böyük hərf)
export function splitSteps(text: string): string[] {
  return text.replace(/\.\s+(?=[A-ZƏÖÜÇŞĞİ])/g, ".\n").split(/\n+/).map((s) => s.trim()).filter(Boolean);
}
