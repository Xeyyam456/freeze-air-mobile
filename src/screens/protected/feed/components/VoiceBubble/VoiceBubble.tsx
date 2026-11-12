import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { PauseIcon, PlayIcon } from "@shared/icons";
import { voiceUrl } from "@shared/services/feedVoice.service";
import { claimVoice, fmtMs, releaseVoice } from "@shared/utils/helpers/voice";
import { toast } from "@shared/utils/helpers/toast";
import VoiceWave from "@screens/protected/feed/components/VoiceWave";
import { c } from "@theme/colors";
import { styles } from "./VoiceBubble.styles";
import type { VoiceBubbleProps } from "./VoiceBubble.types";

const RATES = [1, 1.5, 2];

// Səs şərhi (WhatsApp kimi): oxut/dayandır, dalğa zolağı (oxunan hissə rənglənir), müddət, sürət 1x → 1.5x → 2x.
// Fayl ilk basışda yüklənir (imzalı link; göndərilən şərhdə telefondakı fayldan dərhal). Bir anda yalnız bir səs oxunur
function VoiceBubble({ audio, mine }: VoiceBubbleProps) {
  const player = useAudioPlayer(null, { updateInterval: 100 });
  const st = useAudioPlayerStatus(player);
  const ready = useRef(false);
  const [busy, setBusy] = useState(false);
  const [rate, setRate] = useState(0);
  const stop = useRef(() => player.pause()).current;
  useEffect(() => () => releaseVoice(stop), [stop]);

  const total = st.isLoaded && st.duration > 0 ? st.duration : audio.ms / 1000;
  const done = st.didJustFinish || (ready.current && st.duration > 0 && st.currentTime >= st.duration - 0.05);
  const progress = ready.current && !done ? Math.min(1, st.currentTime / total) : 0;

  const toggle = async () => {
    if (st.playing) { player.pause(); return; }
    try {
      if (!ready.current) {
        setBusy(true);
        player.replace({ uri: audio.local ?? (await voiceUrl(audio.path)) });
        ready.current = true;
        setBusy(false);
      } else if (done) await player.seekTo(0);
      await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false });
      player.setPlaybackRate(RATES[rate]);
      claimVoice(stop);
      player.play();
    } catch { setBusy(false); toast.error("Səs açılmadı"); }
  };
  const cycle = () => { const n = (rate + 1) % RATES.length; setRate(n); player.setPlaybackRate(RATES[n]); };

  return (
    <View style={styles.row}>
      <Pressable onPress={toggle} style={[styles.play, mine && styles.playMine]} accessibilityLabel={st.playing ? "Dayandır" : "Oxut"}>
        {busy ? <ActivityIndicator size="small" color={mine ? c.primary : c.white} />
          : st.playing ? <PauseIcon size={18} color={mine ? c.primary : c.white} /> : <PlayIcon size={18} color={mine ? c.primary : c.white} />}
      </Pressable>
      <View style={styles.mid}>
        <VoiceWave peaks={audio.peaks} progress={progress} color={c.primary} dim={c.faint} />
        <Text style={styles.time}>{fmtMs((progress > 0 || st.playing ? st.currentTime : total) * 1000)}</Text>
      </View>
      <Pressable onPress={cycle} style={styles.rate} hitSlop={6} accessibilityLabel="Sürət"><Text style={styles.rateText}>{RATES[rate]}x</Text></Pressable>
    </View>
  );
}

export default VoiceBubble;
