export type MicMode = "idle" | "hold" | "locked";

export type MicButtonProps = {
  mode: MicMode;
  onStart: () => void; // basıb saxlayanda yazı başlayır
  onLock: () => void; // yuxarı çəkəndə kilidlənir (əl boş qalır)
  onSend: () => void; // buraxanda (və ya kilidli rejimdə toxunanda) göndərilir
  onCancel: () => void; // sola çəkəndə ləğv
};
