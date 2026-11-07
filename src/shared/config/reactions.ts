import type { Reaction } from "@typings/feed";

// Lent reaksiyaları (seçimdə və kartda bu sırada): bazadakı kind → emoji + ad
export const REACTIONS: { kind: Reaction; emoji: string; label: string }[] = [
  { kind: "up", emoji: "👍", label: "Bəyən" },
  { kind: "down", emoji: "👎", label: "Bəyənmə" },
  { kind: "heart", emoji: "❤️", label: "Sevdim" },
  { kind: "clap", emoji: "👏", label: "Əhsən" },
  { kind: "pray", emoji: "🙏", label: "Sağ ol" },
];

const KINDS = new Set<string>(REACTIONS.map((r) => r.kind));
export const isReaction = (v: string): v is Reaction => KINDS.has(v);
