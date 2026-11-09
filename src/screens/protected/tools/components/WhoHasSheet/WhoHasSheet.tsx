import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@shared/components/Avatar";
import DragSheet from "@shared/components/DragSheet";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@shared/icons";
import { groupPeople, personCounts } from "@shared/utils/tools";
import PersonItems from "@screens/protected/tools/components/PersonItems";
import { c } from "@theme/colors";
import type { Person } from "@typings/tools";
import { styles } from "./WhoHasSheet.styles";
import type { WhoHasSheetProps } from "./WhoHasSheet.types";

const fold = (s: string) => s.toLocaleLowerCase("az");

// "Kimdə nə var" (web WhoHasCard + PersonView): usta siyahısı (usta və ya alət axtarışı), toxunanda ustanın üzərindəkilər (alətlər | materiallar); yalnız baxış.
// X, fon, tutacaqdan aşağı çəkmə və "geri" bağlayır
function WhoHasSheet({ all, me, onClose }: WhoHasSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const kb = useKeyboardHeight();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Person | null>(null);
  const people = useMemo(() => groupPeople(all, me).filter((p) => fold(p.name).includes(fold(q.trim())) || p.items.some((h) => fold(h.tools?.name ?? "").includes(fold(q.trim())))), [all, me, q]);
  const cur = open ? groupPeople(all, me).find((p) => p.id === open.id) ?? open : null; // canlı yenilənmə: açıq ustanın siyahısı da dəyişir

  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <DragSheet style={[styles.sheet, { height: Math.min(height * 0.85, height - (kb ? kb + insets.bottom : 0) - insets.top - 12), marginBottom: kb ? kb + insets.bottom : 0 }]} onClose={onClose}>
          <View style={styles.handle} />
          <View style={styles.head}>
            {cur ? <Pressable onPress={() => setOpen(null)} hitSlop={10} style={styles.close} accessibilityLabel="Geri"><ChevronLeftIcon size={18} color={c.muted} /></Pressable> : null}
            <View style={styles.text}>
              <Text style={styles.title} numberOfLines={1}>{cur ? `${cur.name}${cur.id === me ? " (sən)" : ""}` : "Kimdə nə var"}</Text>
              <Text style={styles.sub}>{cur ? "Üzərindəkilər" : `${people.length} ustanın üzərində əşya var`}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          {cur ? <PersonItems person={cur} /> : (
            <>
              <View style={styles.pad}><TextInput value={q} onChangeText={setQ} placeholder="Usta və ya alət axtar..." placeholderTextColor={c.faint} style={styles.search} autoCorrect={false} /></View>
              <ScrollView contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {people.map((p) => {
                  const n = personCounts(p);
                  return (
                    <Pressable key={p.id} onPress={() => setOpen(p)} style={[styles.person, p.id === me && styles.mine]} accessibilityLabel={p.name}>
                      <Avatar name={p.name} photo={p.photo} size={40} />
                      <View style={styles.text}>
                        <Text style={styles.name} numberOfLines={1}>{p.name}{p.id === me ? "  · sən" : ""}</Text>
                        <Text style={styles.sub}>{n.tools ? `${n.tools} alət` : ""}{n.tools && n.mats ? " · " : ""}{n.mats ? `${n.mats} material` : ""}</Text>
                      </View>
                      <ChevronRightIcon size={16} color={c.muted} />
                    </Pressable>
                  );
                })}
                {!people.length ? <Text style={styles.empty}>{q ? "Heç nə tapılmadı." : "Heç kimdə heç nə yoxdur."}</Text> : null}
              </ScrollView>
            </>
          )}
        </DragSheet>
      </View>
    </Modal>
  );
}

export default WhoHasSheet;
