const PALETTE = ["#ff6a5c", "#f5a524", "#34d399", "#22d3ee", "#4f8dff", "#a78bfa", "#f472b6"];
const ORDER = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Kodun ilk simvoluna görə vurğu rəngi (eyni simvol həmişə eyni rəng)
export function toneOf(ch: string): string {
  const i = ORDER.indexOf(ch.toUpperCase());
  return PALETTE[(i < 0 ? 0 : i) % PALETTE.length];
}

// Ada görə sabit rəng (şirkət lövhəsi): ilk simvolun kodu
export const toneOfText = (s: string) => PALETTE[(s.trim().toUpperCase().charCodeAt(0) || 0) % PALETTE.length];
