import type { Session } from "@typings/panel";

// live: açıq seans var → halqa öz taymeri ilə saniyə-saniyə sayır (yalnız halqa render olur, bütün kart yox)
export type WorkRingProps = { sessions: Session[]; live: boolean; size?: number; stroke?: number };
