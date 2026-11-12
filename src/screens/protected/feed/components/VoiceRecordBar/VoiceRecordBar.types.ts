export type VoiceRecordBarProps = {
  ms: number; // yazılan müddət
  locked: boolean; // kilidli: sola çəkmə yox, zibil qutusu düyməsi
  onCancel: () => void;
};
