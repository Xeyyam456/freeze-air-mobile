import { useRef, useState } from "react";
import { ActivityIndicator, Animated, Keyboard, Modal, PanResponder, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import { CloseIcon } from "@shared/icons";
import CommentInput from "@screens/protected/feed/components/CommentInput";
import CommentBubble from "@screens/protected/feed/components/CommentBubble";
import useFeedComments from "@screens/protected/feed/hooks/useFeedComments";
import { c } from "@theme/colors";
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
  // Panelin hündürlüyü: ekranın 64%-i; klaviatura açıqdırsa qalan sahəyə sığır
  const sheetHeight = Math.min(height * 0.64, height - (kb ? kb + insets.bottom : 0) - insets.top - 24);

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

  // Avtomatik sona sürüşmə (web/admin kimi): panel açılanda son şərhə düşür; yeni şərh gələndə istifadəçi aşağıdadırsa (və ya özü yazıbsa) sona sürüşür,
  // yuxarıda köhnə şərhləri oxuyursa yerində qalır
  const stick = useRef(true);
  const opened = useRef(false);

  const send = () => {
    if (!text.trim()) return;
    stick.current = true;
    m.send(text);
    setText("");
  };

  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <Animated.View style={[styles.sheet, { height: sheetHeight, marginBottom: kb ? kb + insets.bottom : 0, transform: [{ translateY: dy }] }]}>
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
            showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" scrollEventThrottle={32}
            onScroll={(e) => {
              const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
              stick.current = contentOffset.y + layoutMeasurement.height >= contentSize.height - 80;
            }}
            onContentSizeChange={() => {
              if (!m.comments.length || !stick.current) return;
              scroll.current?.scrollToEnd({ animated: opened.current });
              opened.current = true; // ilk dəfə (açılış) animasiyasız, sonrakı şərhlərdə yumşaq
            }}>
            {m.loading ? <ActivityIndicator color={c.muted} style={{ marginVertical: 24 }} />
              : !m.comments.length ? (
                <View style={styles.empty}><Text style={styles.emptyEmoji}>💬</Text><Text style={styles.emptyText}>Hələ şərh yoxdur.{"\n"}İlk şərhi sən yaz.</Text></View>
              ) : m.comments.map((cm) => (
                <CommentBubble key={cm.id} comment={cm} mine={cm.employeeId === m.me} canDelete={cm.employeeId === m.me || moderator} canReact={!!m.me} onDelete={m.remove} onReact={m.react} />
              ))}
          </ScrollView>
          <CommentInput text={text} onChange={setText} onSend={send} keyboard={kb} />
        </Animated.View>
      </View>
    </Modal>
  );
}

export default CommentsSheet;
