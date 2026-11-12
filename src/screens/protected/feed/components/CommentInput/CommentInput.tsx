import { useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmojiPicker from "@shared/components/EmojiPicker";
import GradientBg from "@shared/components/GradientBg";
import { SendIcon, SmileIcon } from "@shared/icons";
import MicButton from "@screens/protected/feed/components/MicButton";
import type { MicMode } from "@screens/protected/feed/components/MicButton/MicButton.types";
import VoiceRecordBar from "@screens/protected/feed/components/VoiceRecordBar";
import useVoiceRecorder from "@screens/protected/feed/hooks/useVoiceRecorder";
import { c, gradients } from "@theme/colors";
import { styles } from "./CommentInput.styles";
import type { CommentInputProps } from "./CommentInput.types";

// Şərh yazma sətri: solda smaylik düyməsi (paketi açır, klaviatura bağlanır), yazı sahəsi, sağda göndər. Mətnlə yanaşı smaylik seçib göndərmək olar:
// emoji yazının sonuna əlavə olunur; yalnız smaylikdən ibarət şərh də göndərilir. Yazı sahəsinə toxunanda paket bağlanır.
// Yazı boşdursa göndər əvəzinə MİKROFON (WhatsApp kimi): basıb saxla = səs yaz, burax = göndər, sola = ləğv, yuxarı = kilid
function CommentInput({ text, onChange, onSend, onVoice, keyboard }: CommentInputProps) {
  const insets = useSafeAreaInsets();
  const [emoji, setEmoji] = useState(false);
  const [mode, setMode] = useState<MicMode>("idle");
  const rec = useVoiceRecorder();
  const can = text.trim().length > 0;
  const toggle = () => {
    if (!emoji) Keyboard.dismiss();
    setEmoji((o) => !o);
  };
  const begin = async () => {
    Keyboard.dismiss();
    setEmoji(false);
    setMode("hold");
    if (!(await rec.start())) setMode("idle");
  };
  const send = async () => {
    setMode("idle");
    const v = await rec.finish();
    if (v) onVoice(v);
  };
  const cancel = () => { setMode("idle"); rec.cancel(); };
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        {mode === "idle" ? (
          <>
            <Pressable onPress={toggle} style={[styles.smile, emoji && styles.smileOn]} accessibilityLabel="Smaylik seç">
              <SmileIcon size={22} color={emoji ? c.primary : c.muted} />
            </Pressable>
            <TextInput value={text} onChangeText={onChange} onFocus={() => setEmoji(false)} placeholder="Şərh yaz..." placeholderTextColor={c.muted} style={styles.input} multiline maxLength={1000} />
          </>
        ) : <VoiceRecordBar ms={rec.ms} locked={mode === "locked"} onCancel={cancel} />}
        {can && mode === "idle" ? (
          <Pressable onPress={onSend} style={styles.send} accessibilityLabel="Göndər">
            <GradientBg colors={gradients.accent} radius={23} />
            <SendIcon size={19} color={c.white} />
          </Pressable>
        ) : <MicButton mode={mode} onStart={begin} onLock={() => setMode("locked")} onSend={send} onCancel={cancel} />}
      </View>
      {emoji ? <EmojiPicker onPick={(e) => onChange(text + e)} /> : null}
      <View style={{ height: keyboard || emoji ? (emoji ? insets.bottom : 0) : insets.bottom }} />
    </View>
  );
}

export default CommentInput;
