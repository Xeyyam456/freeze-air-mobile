import { Modal, Pressable, Text, View } from "react-native";
import Button from "@shared/components/Button";
import { CloseIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./ConfirmModal.styles";
import type { ConfirmModalProps } from "./ConfirmModal.types";

// Təsdiq pəncərəsi (geri dönməz addımlar: çıxış, elan göndər/sil). X, fona toxunuş, "Ləğv et" və telefonun "geri"si bağlayır.
// Təsdiqdə pəncərə dərhal bağlanır, iş arxada gedir (UI dərhal dəyişir)
function ConfirmModal({ title, text, icon: Icon, confirmTitle, danger, onConfirm, onClose }: ConfirmModalProps) {
  const tint = danger ? c.danger : c.primary;
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla">
            <CloseIcon size={18} color={c.muted} />
          </Pressable>
          <View style={[styles.iconTile, { backgroundColor: danger ? c.dangerSoft : c.primarySoft }]}><Icon size={24} color={tint} /></View>
          <Text style={styles.title}>{title}</Text>
          {text ? <Text style={styles.text}>{text}</Text> : null}
          <View style={styles.actions}>
            <Button title="Ləğv et" variant="glass" onPress={onClose} style={styles.grow} />
            <Button title={confirmTitle} variant={danger ? "danger" : "gradient"} icon={Icon} style={styles.grow}
              onPress={() => { onClose(); onConfirm(); }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmModal;
