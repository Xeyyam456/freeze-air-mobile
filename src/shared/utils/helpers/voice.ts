// Səs şərhi köməkçiləri: müddət mətni, dalğa zolağı, bir anda yalnız bir səs oxunur

// 83000 ms → "1:23"; saat olsa "1:02:03" (müddət limiti yoxdur)
export function fmtMs(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

// Yazı zamanı toplanan səviyyə nümunələri (dB, -160..0) → n sütunluq 0..100 dalğa; səssizlik də görünsün deyə ən azı 6.
// Nümunə çoxdursa hər sütun öz hissəsinin ortasıdır, azdırsa sütunlar təkrarlanır
export function toPeaks(samples: number[], n = 48): number[] {
  if (!samples.length) return Array.from({ length: n }, () => 6);
  const lvl = (db: number) => Math.round(Math.min(100, Math.max(6, ((Math.max(-60, db) + 60) / 60) * 100)));
  return Array.from({ length: n }, (_, i) => {
    const a = Math.floor((i * samples.length) / n);
    const b = Math.max(a + 1, Math.floor(((i + 1) * samples.length) / n));
    const part = samples.slice(a, b);
    return lvl(part.reduce((s, x) => s + x, 0) / part.length);
  });
}

// Bir anda yalnız bir səs: yenisi başlayanda əvvəlkini dayandırır
let stopCurrent: (() => void) | null = null;
export function claimVoice(stop: () => void) {
  if (stopCurrent && stopCurrent !== stop) stopCurrent();
  stopCurrent = stop;
}
export function releaseVoice(stop: () => void) {
  if (stopCurrent === stop) stopCurrent = null;
}
