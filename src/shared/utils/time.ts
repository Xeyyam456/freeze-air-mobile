// Bakı vaxtı (UTC+4, yay saatı yoxdur). İş günü (work_date, task_date, day) həmişə Bakı tarixidir.
const BAKU_MS = 4 * 60 * 60 * 1000;
const baku = (ms: number) => new Date(ms + BAKU_MS).toISOString();

export const todayBaku = () => baku(Date.now()).slice(0, 10);
export const monthStartBaku = () => `${todayBaku().slice(0, 8)}01`;

// "09:41"
export const timeBaku = (iso: string) => baku(new Date(iso).getTime()).slice(11, 16);

export const isSunday = (day: string) => new Date(`${day}T00:00:00Z`).getUTCDay() === 0;

// İki an arasındakı dəqiqə və qısa müddət yazısı ("1 saat 5 dəq", "12 dəq")
export const mins = (a: string, b: string) => Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 60000));
export const durShort = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} saat ${m % 60} dəq` : `${Math.max(1, m)} dəq`);

const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
const WEEKDAYS = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];

// "Cümə, 6 noyabr"
export function dayLabel(day: string) {
  const d = new Date(`${day}T00:00:00Z`);
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}
