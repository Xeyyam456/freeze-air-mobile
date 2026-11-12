import type { VoiceResult } from "@typings/feed";

export type CommentInputProps = {
  onVoice: (v: VoiceResult) => void; // yazılmış səs şərhi (WhatsApp kimi)
  text: string;
  onChange: (t: string) => void;
  onSend: () => void;
  keyboard: number; // klaviaturanın hündürlüyü (açıq deyilsə 0)
};
