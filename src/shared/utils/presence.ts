import { secs, timeBaku } from "@shared/utils/time";
import type { PresenceAction, Session, TodayAttendance } from "@typings/panel";

export type PresenceTone = "idle" | "working" | "done" | "leave" | "absent" | "sunday";

export type PresenceView = {
  tone: PresenceTone;
  label: string; // "İşdəsən", "İşi bitirdin"...
  sub: string; // "09:02-dən", "09:02 – 18:10"
  action: { title: string; action: PresenceAction; primary: boolean } | null;
};

// Bugünkü vəziyyətdən hero kartın mətni və tək əsas düyməsi (web PresenceActions ilə eyni məntiq)
export function presenceView(day: TodayAttendance): PresenceView {
  const s = day.sessions;
  const last = s[s.length - 1];
  if (day.status === "absent") return { tone: "absent", label: "İşdə olmayıb", sub: "Bu gün qeyd olunub", action: null };
  if (day.status === "pending") {
    return { tone: "idle", label: "Hələ gəlməmisən", sub: "İş günü 09:00", action: { title: "İşə gəldim", action: "in", primary: true } };
  }
  if (day.status === "present" && last && !last.out) {
    return { tone: "working", label: "İşdəsən", sub: `${timeBaku(last.in)}-dən`, action: { title: "İşi bitirdim", action: "out", primary: false } };
  }
  if (day.status === "present" && last?.out) {
    return {
      tone: "done",
      label: "İşi bitirdin",
      sub: `${timeBaku(s[0].in)} – ${timeBaku(last.out)}`,
      action: { title: "Yenidən işə çıxdım", action: "in", primary: false },
    };
  }
  if (day.status === "leave") {
    return { tone: "leave", label: "İcazəlisən", sub: "Bu gün icazəli gündür", action: { title: "İcazəyə ehtiyac qalmadı", action: "giveUpLeave", primary: false } };
  }
  return { tone: "sunday", label: "Bazar", sub: "İş günü deyil", action: { title: "Bazar günü işdəyəm", action: "in", primary: false } };
}

// Bugünkü işlənmiş saniyə (açıq seans indiyə qədər sayılır)
export function workedSeconds(sessions: Session[], nowIso: string) {
  return sessions.reduce((s, x) => s + secs(x.in, x.out ?? nowIso), 0);
}
