import { useState } from "react";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmojiPicker from "@shared/components/EmojiPicker";
import GradientBg from "@shared/components/GradientBg";
import { SendIcon, SmileIcon } from "@shared/icons";
import { c, gradients } from "@theme/colors";
import { styles } from "./CommentInput.styles";
import type { CommentInputProps } from "./CommentInput.types";

// Şərh yazma sətri: solda smaylik düyməsi (paketi açır, klaviatura bağlanır), yazı sahəsi, göndər. Mətnlə yanaşı smaylik seçib göndərmək olar:
// emoji yazının sonuna əlavə olunur; yalnız smaylikdən ibarət şərh də göndərilir. Yazı sahəsinə toxunanda paket bağlanır
function CommentInput({ text, onChange, onSend, keyboard }: CommentInputProps) {
  const insets = useSafeAreaInsets();
  const [emoji, setEmoji] = useState(false);
  const can = text.trim().length > 0;
  const toggle = () => {
    if (!emoji) Keyboard.dismiss();
    setEmoji((o) => !o);
  };
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <Pressable onPress={toggle} style={[styles.smile, emoji && styles.smileOn]} accessibilityLabel="Smaylik seç">
          <SmileIcon size={22} color={emoji ? c.primary : c.muted} />
        </Pressable>
        <TextInput value={text} onChangeText={onChange} onFocus={() => setEmoji(false)} placeholder="Şərh yaz..." placeholderTextColor={c.muted} style={styles.input} multiline maxLength={1000} />
        <Pressable onPress={onSend} disabled={!can} style={[styles.send, !can && styles.sendOff]} accessibilityLabel="Göndər">
          {can ? <GradientBg colors={gradients.accent} radius={23} /> : null}
          <SendIcon size={19} color={can ? c.white : c.faint} />
        </Pressable>
      </View>
      {emoji ? <EmojiPicker onPick={(e) => onChange(text + e)} /> : null}
      <View style={{ height: keyboard || emoji ? (emoji ? insets.bottom : 0) : insets.bottom }} />
    </View>
  );
}

export default CommentInput;
