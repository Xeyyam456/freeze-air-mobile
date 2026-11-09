import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CheckIcon, CloseIcon } from "@shared/icons";
import DragSheet from "@shared/components/DragSheet";
import { c } from "@theme/colors";
import { styles } from "./ModelSheet.styles";
import type { ModelSheetProps } from "./ModelSheet.types";

const SEARCH_FROM = 7; // bu qədər və çox model olanda axtarış sahəsi görünür

// Model siyahısı (alt panel): ad + kod sayı, seçilmişdə işarə. Çox model olanda axtarış; siyahı öz içində sürüşür. X, fon və "geri" bağlayır
function ModelSheet({ models, counts, value, onPick, onClose }: ModelSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState("");
  const list = useMemo(() => models.filter((m) => m.name.toLocaleLowerCase("az").includes(q.trim().toLocaleLowerCase("az"))), [models, q]);
  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <DragSheet style={[styles.sheet, { maxHeight: height * 0.8, paddingBottom: insets.bottom + 12 }]} onClose={onClose}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <Text style={styles.title}>Model seç</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          {models.length >= SEARCH_FROM ? <TextInput value={q} onChangeText={setQ} placeholder="Model axtar..." placeholderTextColor={c.faint} style={styles.search} autoCorrect={false} /> : null}
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {list.map((m) => (
              <Pressable key={m.id} onPress={() => onPick(m.id)} style={styles.row}>
                <Text style={[styles.name, m.id === value && styles.nameOn]} numberOfLines={1}>{m.name}</Text>
                <Text style={styles.count}>{counts.get(m.id) ?? 0}</Text>
                <View style={styles.check}>{m.id === value ? <CheckIcon size={18} color={c.primary} /> : null}</View>
              </Pressable>
            ))}
            {!list.length ? <Text style={styles.empty}>Model tapılmadı.</Text> : null}
          </ScrollView>
        </DragSheet>
      </View>
    </Modal>
  );
}

export default ModelSheet;
