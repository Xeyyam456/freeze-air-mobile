import { RecordingPresets, requestRecordingPermissionsAsync, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio";
import { useEffect, useRef } from "react";
import { toast } from "@shared/utils/helpers/toast";
import { toPeaks } from "@shared/utils/helpers/voice";
import type { VoiceResult } from "@typings/feed";

// Səs: mono 64 kbit/s AAC (.m4a) ≈ 0,5 MB/dəq — limitsiz müddətdə də yüngül qalır; səviyyə ölçülür (dalğa zolağı üçün)
const PRESET = { ...RecordingPresets.HIGH_QUALITY, numberOfChannels: 1, bitRate: 64000, isMeteringEnabled: true };
const MIN_MS = 700;

// Səs yazıcı: start (icazə → yazı), finish (saxla və nəticəni ver), cancel (at). start bitməmiş buraxılsa finish onu gözləyir
function useVoiceRecorder() {
  const recorder = useAudioRecorder(PRESET);
  const st = useAudioRecorderState(recorder, 100);
  const samples = useRef<number[]>([]);
  const starting = useRef<Promise<boolean> | null>(null);
  const on = useRef(false);

  useEffect(() => {
    if (on.current && st.isRecording && st.metering != null) samples.current.push(st.metering);
  }, [st.metering, st.durationMillis, st.isRecording]);

  const start = () => {
    starting.current = (async () => {
      try {
        const p = await requestRecordingPermissionsAsync();
        if (!p.granted) { toast.error("Səs yazmaq üçün mikrofon icazəsi lazımdır"); return false; }
        await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
        samples.current = [];
        await recorder.prepareToRecordAsync();
        recorder.record();
        on.current = true;
        return true;
      } catch { toast.error("Səs yazmaq alınmadı"); return false; }
    })();
    return starting.current;
  };

  const halt = async (): Promise<{ uri: string | null; ms: number } | null> => {
    const ok = await starting.current;
    starting.current = null;
    if (!ok || !on.current) return null;
    on.current = false;
    const ms = Math.round(recorder.currentTime * 1000);
    await recorder.stop().catch(() => undefined);
    await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true }).catch(() => undefined);
    return { uri: recorder.uri, ms };
  };

  const finish = async (): Promise<VoiceResult | null> => {
    const r = await halt();
    if (!r?.uri) return null;
    if (r.ms < MIN_MS) { toast.info("Səs çox qısadır", "Yazmaq üçün düyməni basıb saxla"); return null; }
    return { uri: r.uri, ms: r.ms, peaks: toPeaks(samples.current) };
  };

  return { ms: st.durationMillis, start, finish, cancel: () => void halt() };
}

export default useVoiceRecorder;
