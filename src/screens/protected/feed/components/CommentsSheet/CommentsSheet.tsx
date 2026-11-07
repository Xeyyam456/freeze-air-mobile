import { useRef, useState } from "react";
import { ActivityIndicator, Animated, Keyboard, Modal, PanResponder, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@shared/components/Avatar";
import GradientBg from "@shared/components/GradientBg";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import { CloseIcon, SendIcon, TrashIcon } from "@shared/icons";
import { feedWhen } from "@shared/utils/feed";
import useFeedComments from "@screens/protected/feed/hooks/useFeedComments";
import { c, gradients } from "@theme/colors";
import { styles } from "./CommentsSheet.styles";
import type { CommentsSheetProps } from "./CommentsSheet.types";

// Paylaşımın şərhləri — alt panel (bottom sheet), söhbət qabarcıqları: başqaları solda (şəkil + ad), mənimki sağda.
// Tutacaqdan (üstdəki xətt və başlıq) AŞAĞI SÜRÜŞDÜRƏNDƏ panel bağlanır (kifayət qədər çəkilsə və ya sürətli çəkilsə; yoxsa geri qayıdır).
// Şərh klik anında siyahıda görünür (optimistik). Silmək: öz şərhi; rəhbərlik hamısını. Paylaşımın ustasına push gedir (bazada).
// Klaviatura açılanda panel yuxarı qalxır, yazı sahəsi örtülmür. X, fon və "geri" də bağlayır
function CommentsSheet({ logId, group, moderator, onClose }: CommentsSheetProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const kb = useKeyboardHeight();
  const m = useFeedComments(logId, group);
  const [text, setText] = useState("");
  const scroll = useRef<{ scrollToEnd: (o?: { animated?: boolean }) => void } | null>(null);
  const can = text.trim().length > 0;
  // Panelin hündürlüyü: ekranın 64%-i; klaviatura açıqdırsa qalan sahəyə sığır
  const sheetHeight = Math.min(height * 0.64, height - kb - insets.top - 24);

  // Sürüşdürmə: tutacaq sahəsində PanResponder; panel barmağı izləyir, buraxanda ya bağlanır ya geri qayıdır
  const dy = useRef(new Animated.Value(0)).current;
  const close = useRef(onClose);
  close.current = onClose;
  const drag = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => Keyboard.dismiss(),
    onPanResponderMove: (_, g) => { if (g.dy > 0) dy.setValue(g.dy); },
    onPanResponderRelease: (_, g) => {
      if (g.dy > 90 || g.vy > 0.9) Animated.timing(dy, { toValue: 700, duration: 180, useNativeDriver: true }).start(() => close.current());
      else Animated.spring(dy, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
    },
    onPanResponderTerminate: () => Animated.spring(dy, { toValue: 0, useNativeDriver: true }).start(),
  })).current;

  const send = () => {
    if (!can) return;
    m.send(text);
    setText("");
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
  };

  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <Animated.View style={[styles.sheet, { height: sheetHeight, marginBottom: kb, transform: [{ translateY: dy }] }]}>
          <View {...drag.panHandlers}>
            <View style={styles.handleArea}><View style={styles.handle} /></View>
            <View style={styles.head}>
              <Text style={styles.emoji}>💬</Text>
              <Text style={styles.title}>Şərhlər</Text>
              {m.comments.length ? <Text style={styles.count}>{m.comments.length}</Text> : null}
              <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
            </View>
          </View>
          <ScrollView ref={(r) => { scroll.current = r as unknown as typeof scroll.current; }} style={styles.list} contentContainerStyle={m.comments.length ? styles.listContent : { flexGrow: 1 }}
            showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {m.loading ? <ActivityIndicator color={c.muted} style={{ marginVertical: 24 }} />
              : !m.comments.length ? (
                <View style={styles.empty}><Text style={styles.emptyEmoji}>💬</Text><Text style={styles.emptyText}>Hələ şərh yoxdur.{"\n"}İlk şərhi sən yaz.</Text></View>
              ) : m.comments.map((cm) => {
                const mine = cm.employeeId === m.me;
                return (
                  <View key={cm.id} style={[styles.row, mine && styles.rowMine]}>
                    {!mine ? <Avatar name={cm.name} photo={cm.photo} size={32} /> : null}
                    <View style={[styles.bubble, mine && styles.bubbleMine]}>
                      {!mine ? <Text style={styles.name} numberOfLines={1}>{cm.name}</Text> : null}
                      <Text style={styles.body}>{cm.body}</Text>
                      <View style={styles.meta}>
                        <Text style={styles.when}>{feedWhen(cm.at)}</Text>
                        {cm.id > 0 && (mine || moderator) ? (
                          <Pressable onPress={() => m.remove(cm)} hitSlop={10} accessibilityLabel="Şərhi sil"><TrashIcon size={14} color={c.faint} /></Pressable>
                        ) : null}
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
          <View style={[styles.inputRow, { paddingBottom: (kb ? 10 : insets.bottom) + 10 }]}>
            <TextInput value={text} onChangeText={setText} placeholder="Şərh yaz..." placeholderTextColor={c.muted} style={styles.input} multiline maxLength={1000} />
            <Pressable onPress={send} disabled={!can} style={[styles.send, !can && styles.sendOff]} accessibilityLabel="Göndər">
              {can ? <GradientBg colors={gradients.accent} radius={23} /> : null}
              <SendIcon size={19} color={can ? c.white : c.faint} />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default CommentsSheet;
