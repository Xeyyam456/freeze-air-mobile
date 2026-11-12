export type VoiceWaveProps = {
  peaks: number[]; // 0..100
  progress: number; // 0..1 (oxunmuş hissə rənglənir)
  color: string; // oxunmuş
  dim: string; // oxunmamış
  height?: number;
};
