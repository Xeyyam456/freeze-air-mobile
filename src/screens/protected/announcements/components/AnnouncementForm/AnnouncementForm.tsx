import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Button from "@shared/components/Button";
import ConfirmModal from "@shared/components/ConfirmModal";
import { MegaphoneIcon, SendIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./AnnouncementForm.styles";
import type { AnnouncementFormProps } from "./AnnouncementForm.types";

// Yeni elan (yalnız rəhbərlik): başlıq (bildirişin özü) + istəyə görə mətn. Göndərməzdən əvvəl təsdiq: hamıya gedir, geri alınmır
function AnnouncementForm({ onSend }: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [confirm, setConfirm] = useState(false);

  function send() {
    onSend(title, body);
    setTitle("");
    setBody("");
  }

  return (
    <View style={styles.card}>
      <Text style={styles.head}>Yeni elan</Text>
      <TextInput value={title} onChangeText={setTitle} maxLength={120} style={styles.input} placeholderTextColor={c.faint}
        placeholder="Məs.: Sabah saat 9:00-da iclas" />
      <TextInput value={body} onChangeText={setBody} maxLength={1000} multiline textAlignVertical="top"
        style={[styles.input, styles.body]} placeholderTextColor={c.faint} placeholder="Ətraflı (istəyə görə): yer, gündəm..." />
      <View style={styles.footer}>
        <Text style={styles.hint}>Hamıya push bildiriş kimi gedir.</Text>
        <Button title="Göndər" variant="gradient" icon={SendIcon} disabled={!title.trim()} onPress={() => setConfirm(true)} style={styles.button} />
      </View>
      {confirm && (
        <ConfirmModal title="Elan hamıya göndərilsin?" icon={MegaphoneIcon} confirmTitle="Göndər" onConfirm={send}
          onClose={() => setConfirm(false)} text={`«${title.trim()}»\nGöndərilən bildirişi geri qaytarmaq olmur.`} />
      )}
    </View>
  );
}

export default AnnouncementForm;
