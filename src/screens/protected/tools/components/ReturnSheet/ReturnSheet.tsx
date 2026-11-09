import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@shared/components/Button";
import DragSheet from "@shared/components/DragSheet";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import { CloseIcon, SendIcon } from "@shared/icons";
import { calcReturn, emptyDraft } from "@shared/utils/tools";
import ReturnLine from "@screens/protected/tools/components/ReturnLine";
import { c } from "@theme/colors";
import type { ReturnDraft } from "@typings/tools";
import { styles } from "./ReturnSheet.styles";
import type { ReturnSheetProps } from "./ReturnSheet.types";

// Qaytarma (web ReturnModal): bir və ya bir neçə alət; hər biri ayrıca sorğu olur, depo məsulu qəbul edəndə səndən çıxır.
// X, fon, tutacaqdan aşağı çəkmə və "geri" bağlayır
function ReturnSheet({ holds, onSend, onClose }: ReturnSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const kb = useKeyboardHeight();
  const [drafts, setDrafts] = useState<Record<number, ReturnDraft>>(() => Object.fromEntries(holds.map((h) => [h.id, emptyDraft(h)])));
  const [note, setNote] = useState("");
  const checks = holds.map((h) => ({ hold: h, calc: calcReturn(h, drafts[h.id]) }));
  const ready = checks.every((x) => x.calc.ok);
  const one = holds.length === 1;
  const send = () => { if (!ready) return; onSend(checks, note); onClose(); };

  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <DragSheet style={[styles.sheet, { maxHeight: height * 0.9 - (kb || 0), marginBottom: kb ? kb + insets.bottom : 0 }]} onClose={onClose}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={styles.text}>
              <Text style={styles.title} numberOfLines={2}>{one ? `Qaytar: ${holds[0].tools?.name ?? ""}` : `${holds.length} şeyi qaytar`}</Text>
              <Text style={styles.sub}>Depo məsulu qəbul edəndə səndən çıxır</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          <ScrollView contentContainerStyle={[styles.body, { paddingBottom: (kb ? 0 : insets.bottom) + 20 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {holds.map((h) => <ReturnLine key={h.id} hold={h} draft={drafts[h.id]} onChange={(d) => setDrafts((all) => ({ ...all, [h.id]: d }))} />)}
            <TextInput value={note} onChangeText={setNote} placeholder="Qeyd (istəyə görə)" placeholderTextColor={c.faint} style={styles.note} />
            <Button title={one ? "Sorğu göndər" : `${holds.length} sorğu göndər`} variant="gradient" icon={SendIcon} disabled={!ready} onPress={send} />
          </ScrollView>
        </DragSheet>
      </View>
    </Modal>
  );
}

export default ReturnSheet;
