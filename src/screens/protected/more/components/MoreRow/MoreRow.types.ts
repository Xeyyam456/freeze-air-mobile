import type { MoreLink } from "@shared/config/more";

// index: menyudakı ümumi sıra (qruplar boyu) — giriş və "dalğa" animasiyasının gecikməsi
export type MoreRowProps = { link: MoreLink; first: boolean; index: number; onPress: () => void };
