import { c } from "@theme/colors";
import type { MyHold, MyRequest, ReturnCalc, ReturnDraft, ToolInfo } from "@typings/tools";

// Miqdar kəsr ola bilər (balon = 11,3 kq); alət həmişə tam ədəd. 2 rəqəmə yuvarlanır (web `Depot/utils/quantity` ilə eyni)
export const round2 = (n: number) => Math.round(n * 100) / 100;
export const fmt = (n: number) => String(round2(n)).replace(".", ",");
export const parseQty = (s: string) => (s.trim() === "" ? NaN : Number(s.trim().replace(",", ".")));
type Pack = { pack_name: string | null; pack_size: number | null };
export const isPacked = (p: Pack | null | undefined): p is { pack_name: string; pack_size: number } => !!p?.pack_name && !!p?.pack_size;
const packSuffix = (n: number, p: Pack) => {
  if (!isPacked(p) || n <= 0) return "";
  const count = round2(n / p.pack_size);
  return Number.isInteger(count) ? ` (${count} ${p.pack_name})` : "";
};
// "11,3 kq (1 balon)" (qablı material) | "12 metr" | "3 ədəd"
export const showQty = (n: number, unit: string, p?: Pack | null) => `${fmt(n)} ${unit}${p ? packSuffix(n, p) : ""}`;
export const unitOf = (t: Pick<ToolInfo, "kind" | "unit">) => (t.kind === "material" ? t.unit : "ədəd");

// Sorğunun adı və yazılışı
export const requestLabel = (r: Pick<MyRequest, "type" | "tool_kind">) =>
  r.type === "request" ? (r.tool_kind === "material" ? "Material istəyi" : "Alət istəyi") : r.type === "return" ? "Qaytarma" : r.type === "writeoff" ? "Silinmə" : r.type;
export function requestLine(r: MyRequest) {
  const u = r.tool_kind === "material" ? r.unit : "ədəd";
  if (r.type === "return" && r.tool_kind === "material") return `işlətdim ${fmt(r.used ?? 0)}, qaytarıram ${fmt(r.returned ?? 0)} ${u}`;
  return `${fmt(r.quantity ?? 0)} ${u}`;
}
export const STATUS: Record<string, { text: string; fg: string; bg: string }> = {
  pending: { text: "Gözləyir", fg: c.orange, bg: c.orangeSoft },
  approved: { text: "Qəbul edildi", fg: c.ok, bg: c.okSoft },
  rejected: { text: "Rədd edildi", fg: c.danger, bg: c.dangerSoft },
  cancelled: { text: "Ləğv olundu", fg: c.muted, bg: c.glass },
};

export const emptyDraft = (h: MyHold): ReturnDraft => ({ qty: String(h.quantity), ret: "", byPack: false, restUsed: true });

// Qaytarma hesabı (web `MyTools/utils/draft` ilə eyni): alətdə 1…səndə olan tam say; materialda qaytarılan + işlədilən, qalan məndə qalır
export function calcReturn(h: MyHold, d: ReturnDraft): ReturnCalc {
  const t = h.tools;
  if (!t) return { ok: false, over: false, quantity: 0, used: 0, returned: 0, hint: "" };
  if (t.kind !== "material") {
    const q = parseQty(d.qty);
    const ok = Number.isInteger(q) && q >= 1 && q <= h.quantity;
    return { ok, over: q > h.quantity, quantity: q, used: 0, returned: 0, hint: ok ? `${q} ədəd qaytarılır` : `1 ilə ${h.quantity} arası yaz` };
  }
  const typed = parseQty(d.ret);
  const ret = round2((Number.isNaN(typed) ? 0 : typed) * (isPacked(t) && d.byPack ? t.pack_size : 1));
  const rest = round2(h.quantity - ret);
  const used = d.restUsed ? Math.max(0, rest) : 0;
  const over = rest < 0;
  const hint = over ? "Səndə olandan çox ola bilməz" : [
    used > 0 && `işlətdim ${fmt(used)} ${t.unit}`,
    ret > 0 && `qaytarıram ${fmt(ret)} ${t.unit}`,
    !d.restUsed && rest > 0 && `məndə qalır ${fmt(rest)} ${t.unit}`,
  ].filter(Boolean).join(" · ") || "nə qədər qaytardığını yaz";
  return { ok: !over && (ret > 0 || used > 0), over, quantity: 0, used, returned: ret, hint };
}

// Təsadüfi qrup nömrəsi (bir "istə" göndərişinin sətirləri depoda bir qrup kimi görünür)
export const batchId = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
  const r = Math.floor(Math.random() * 16);
  return (ch === "x" ? r : (r % 4) + 8).toString(16);
});
