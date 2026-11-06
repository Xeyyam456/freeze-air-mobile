import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CameraIcon, CloseIcon, FileTextIcon, ImageIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./SourceMenu.styles";
import type { SourceMenuProps } from "./SourceMenu.types";

const OPTION = {
  camera: { label: "Kamera ilə çək", icon: CameraIcon },
  gallery: { label: "Qalereyadan seç", icon: ImageIcon },
  pdf: { label: "PDF fayl seç", icon: FileTextIcon },
} as const;

// Mənbə seçimi (aşağıdan açılan kart): X, fona toxunuş və telefonun "geri" düyməsi bağlayır
function SourceMenu({ title, sources, onPick, onClose }: SourceMenuProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.head}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla">
            <CloseIcon size={18} color={c.muted} />
          </Pressable>
        </View>
        {sources.map((s) => {
          const { label, icon: Icon } = OPTION[s];
          return (
            <Pressable key={s} style={({ pressed }) => [styles.option, pressed && styles.pressed]}
              onPress={() => { onClose(); onPick(s); }}>
              <View style={styles.iconTile}><Icon size={18} color={c.primary} /></View>
              <Text style={styles.label}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

export default SourceMenu;
