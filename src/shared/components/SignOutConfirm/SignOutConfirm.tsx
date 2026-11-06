import { Modal, Pressable, Text, View } from "react-native";
import Button from "@shared/components/Button";
import { CloseIcon, LogOutIcon } from "@shared/icons";
import { signOut } from "@shared/services/auth.service";
import { c } from "@theme/colors";
import { styles } from "./SignOutConfirm.styles";
import type { SignOutConfirmProps } from "./SignOutConfirm.types";

// Hesabdan çıxış HƏMİŞƏ təsdiqlə (istifadəçi qaydası). X, fona toxunuş, "Ləğv et" və telefonun "geri"si bağlayır
function SignOutConfirm({ onClose }: SignOutConfirmProps) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla">
            <CloseIcon size={18} color={c.muted} />
          </Pressable>
          <View style={styles.iconTile}><LogOutIcon size={24} color={c.danger} /></View>
          <Text style={styles.title}>Hesabdan çıxırsan?</Text>
          <Text style={styles.text}>Yenidən daxil olmaq üçün e-poçt və parol lazım olacaq. Bu telefona bildirişlər gəlməyəcək.</Text>
          <View style={styles.actions}>
            <Button title="Ləğv et" variant="glass" onPress={onClose} style={styles.grow} />
            <Button title="Çıx" variant="danger" icon={LogOutIcon} onPress={() => { onClose(); void signOut(); }} style={styles.grow} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SignOutConfirm;
