import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@shared/components/Button";
import DragSheet from "@shared/components/DragSheet";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import { CloseIcon, SendIcon } from "@shared/icons";
import { calcReturn, emptyDraft, isPacked, showQty, unitOf } from "@shared/utils/tools";
import UnitToggle from "@screens/protected/tools/components/UnitToggle";
import { c } from "@theme/colors";
import { styles } from "./ReturnSheet.styles";
import type { ReturnSheetProps } from "./ReturnSheet.types";

// Qaytarma (web ReturnModal, tək alət): alətdə say; materialda "qaytarıram" (+ balon/kq) və "qalanı: işlətdim | məndə qalır".
// Sorğu depo məsuluna gedir, o qəbul edəndə səndən çıxır. X, fon, tutacaqdan aşağı çəkmə və "geri" bağlayır
function ReturnSheet({ hold: h, onSend, onClose }: ReturnSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const kb = useKeyboardHeight();
  const [d, setD] = useState(() => emptyDraft(h));
  const [note, setNote] = useState("");
  const t = h.tools;
  if (!t) return null;
  const material = t.kind === "material";
  const calc = calcReturn(h, d);
  const send = () => { if (!calc.ok) return; onSend(h, calc, note); onClose(); };

  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <DragSheet style={[styles.sheet, { maxHeight: height * 0.9 - (kb || 0), marginBottom: kb ? kb + insets.bottom : 0 }]} onClose={onClose}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={styles.text}>
              <Text style={styles.title} numberOfLines={2}>Qaytar: {t.name}</Text>
              <Text style={styles.sub}>səndə {showQty(h.quantity, unitOf(t), t)} · depo məsulu qəbul edəndə səndən çıxır</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          <ScrollView contentContainerStyle={[styles.body, { paddingBottom: (kb ? 0 : insets.bottom) + 20 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {material ? (
              <>
                <View style={styles.line}>
                  <Text style={styles.label}>Qaytarıram</Text>
                  <TextInput value={d.ret} onChangeText={(v) => setD({ ...d, ret: v })} keyboardType="decimal-pad" placeholder="0" placeholderTextColor={c.faint} style={[styles.input, calc.over && styles.bad]} />
                  {isPacked(t) ? <UnitToggle value={d.byPack} onChange={(v) => setD({ ...d, byPack: v })} on={t.pack_name} off={t.unit} /> : <Text style={styles.unit}>{t.unit}</Text>}
                </View>
                <View style={styles.line}>
                  <Text style={styles.label}>Qalanı</Text>
                  <UnitToggle value={d.restUsed} onChange={(v) => setD({ ...d, restUsed: v })} on="işlətdim" off="məndə qalır" />
                </View>
              </>
            ) : (
              <View style={styles.line}>
                <Text style={styles.label}>Say</Text>
                <TextInput value={d.qty} onChangeText={(v) => setD({ ...d, qty: v })} keyboardType="number-pad" selectTextOnFocus style={[styles.input, calc.over && styles.bad]} />
                <Text style={styles.unit}>ədəd</Text>
              </View>
            )}
            <Text style={[styles.hint, calc.over && styles.hintBad]}>{calc.hint}</Text>
            <TextInput value={note} onChangeText={setNote} placeholder="Qeyd (istəyə görə)" placeholderTextColor={c.faint} style={styles.note} />
            <Button title="Sorğu göndər" variant="gradient" icon={SendIcon} disabled={!calc.ok} onPress={send} />
          </ScrollView>
        </DragSheet>
      </View>
    </Modal>
  );
}

export default ReturnSheet;
