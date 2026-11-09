import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@shared/components/Button";
import DragSheet from "@shared/components/DragSheet";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import { CloseIcon, SendIcon } from "@shared/icons";
import { isPacked, parseQty, round2 } from "@shared/utils/helpers/tools";
import AskRow from "@screens/protected/tools/components/AskRow";
import ToolTabs from "@screens/protected/tools/components/ToolTabs";
import { c } from "@theme/colors";
import type { StockTool, ToolKind } from "@typings/tools";
import { styles } from "./AskSheet.styles";
import type { AskSheetProps } from "./AskSheet.types";

const fold = (s: string) => s.toLocaleLowerCase("az");

// Alət istə (bir dəfəyə bir neçə, web AskModal ilə eyni): işarələ, miqdarı yaz, birdən göndər — hamısı bir qrup kimi depoda görünür.
// Qablı materialda miqdar balonla (standart) və ya kq ilə; bazaya həmişə vahidlə gedir. X, fon, tutacaqdan aşağı çəkmə və "geri" bağlayır
function AskSheet({ stock, askedIds, initialKind, onSend, onClose }: AskSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const kb = useKeyboardHeight();
  const [tab, setTab] = useState<ToolKind>(initialKind);
  const [query, setQuery] = useState("");
  const [qty, setQty] = useState<Record<number, string>>({});
  const [byPack, setByPack] = useState<Record<number, boolean>>({});
  const [note, setNote] = useState("");
  const packed = (t: StockTool) => isPacked(t) && byPack[t.id] !== false;
  const amount = (t: StockTool) => round2(parseQty(qty[t.id] ?? "") * (packed(t) ? (t.pack_size as number) : 1));
  const chosen = stock.filter((t) => qty[t.id] !== undefined);
  const okQty = (t: StockTool) => { const n = parseQty(qty[t.id] ?? ""); return n > 0 && (t.kind === "material" || Number.isInteger(n)); };
  const valid = chosen.length > 0 && chosen.every(okQty);
  const shown = stock.filter((t) => (t.kind === "material" ? "material" : "tool") === tab && fold(t.name).includes(fold(query.trim())));
  const toggle = (t: StockTool) => setQty((q) => { const n = { ...q }; if (n[t.id] === undefined) n[t.id] = "1"; else delete n[t.id]; return n; });
  const send = () => { onSend(chosen.map((t) => ({ tool: t, amount: amount(t) })), note); onClose(); };

  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <DragSheet style={[styles.sheet, { height: Math.min(height * 0.9, height - (kb ? kb + insets.bottom : 0) - insets.top - 12), marginBottom: kb ? kb + insets.bottom : 0 }]} onClose={onClose}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={styles.text}>
              <Text style={styles.title}>{tab === "material" ? "Material istə" : "Alət istə"}</Text>
              <Text style={styles.sub}>İşarələ, miqdarı yaz, birdən göndər</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          <View style={styles.pad}>
            <ToolTabs value={tab} onChange={setTab} />
            <TextInput value={query} onChangeText={setQuery} placeholder="Axtar..." placeholderTextColor={c.faint} style={styles.search} autoCorrect={false} />
          </View>
          <ScrollView style={styles.list} contentContainerStyle={styles.listBody} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {shown.map((t) => (
              <AskRow key={t.id} tool={t} asked={askedIds.has(t.id)} qty={qty[t.id]} byPack={byPack[t.id] !== false}
                onToggle={() => toggle(t)} onQty={(v) => setQty((q) => ({ ...q, [t.id]: v }))} onByPack={(v) => setByPack((m) => ({ ...m, [t.id]: v }))} />
            ))}
            {!shown.length ? <Text style={styles.empty}>Heç nə tapılmadı.</Text> : null}
          </ScrollView>
          <View style={[styles.foot, { paddingBottom: kb ? 12 : insets.bottom + 12 }]}>
            <TextInput value={note} onChangeText={setNote} placeholder="Nə üçün (istəyə görə)" placeholderTextColor={c.faint} style={styles.search} />
            <Button title={chosen.length ? `İstə (${chosen.length})` : "Yuxarıdan seç"} variant="gradient" icon={SendIcon} disabled={!valid} onPress={send} />
          </View>
        </DragSheet>
      </View>
    </Modal>
  );
}

export default AskSheet;
