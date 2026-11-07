import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { REACTIONS } from "@shared/config/reactions";
import { MessageSquareTextIcon, SmilePlusIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./ReactionBar.styles";
import type { ReactionBarProps } from "./ReactionBar.types";

// Kartın altı: solda premium şərh düyməsi (gradient plitə + say), sağda reaksiya seçimi (gülüş ikonu → 👍 👎 ❤️ 👏 🙏 açılır,
// seçən kimi göndərilir və bağlanır; seçilmişi yenidən seçsə geri götürülür) və verilmiş reaksiyaların sayları (toxunuş → kimlər)
function ReactionBar({ post, mine, onReact, onReactors, onComments }: ReactionBarProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), 5000); // kənara toxunuş izlənmir: özü bağlanır
    return () => clearTimeout(t);
  }, [open]);
  const on = post.comments > 0;
  const counts = post.reactions ?? {}; // telefonun diskindəki köhnə keşdə (up/down) bu sahə yoxdur
  return (
    <View style={styles.bar}>
      <Pressable onPress={() => onComments(post)} hitSlop={8} style={[styles.comment, on && styles.commentOn]} accessibilityLabel={`${post.comments} şərh`}>
        <View style={[styles.tile, on ? styles.tileOn : styles.tileOff]}>
          {on ? (
            <Svg style={styles.gradient} width={32} height={32}>
              <Defs><LinearGradient id="cm" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#4f8dff" /><Stop offset="1" stopColor="#22d3ee" /></LinearGradient></Defs>
              <Rect width={32} height={32} fill="url(#cm)" />
            </Svg>
          ) : null}
          <MessageSquareTextIcon size={17} color={on ? c.white : c.muted} strokeWidth={2.2} />
        </View>
        <Text style={[styles.commentText, on && styles.commentTextOn]}>{on ? post.comments : "Şərh"}</Text>
      </Pressable>
      <View style={styles.right}>
        {REACTIONS.filter((r) => counts[r.kind]).map((r) => (
          <Pressable key={r.kind} onPress={() => onReactors(post)} hitSlop={6} style={[styles.chip, post.mine === r.kind && styles.chipMine]} accessibilityLabel={`${counts[r.kind]} ${r.label}, kimlər`}>
            <Text style={styles.chipEmoji}>{r.emoji}</Text>
            <Text style={[styles.chipCount, post.mine === r.kind && { color: c.primary }]}>{counts[r.kind]}</Text>
          </Pressable>
        ))}
        {!mine ? (
          <Pressable onPress={() => setOpen((o) => !o)} hitSlop={6} style={[styles.smile, (open || post.mine) && styles.smileOn]} accessibilityLabel="Reaksiya ver">
            <SmilePlusIcon size={18} color={open || post.mine ? c.primary : c.muted} strokeWidth={2.1} />
          </Pressable>
        ) : null}
        {open ? (
          <Animated.View entering={ZoomIn.duration(160)} style={styles.popup}>
            {REACTIONS.map((r) => (
              <Pressable key={r.kind} onPress={() => { setOpen(false); onReact(post, r.kind); }} style={[styles.pick, post.mine === r.kind && styles.pickOn]} accessibilityLabel={r.label}>
                <Text style={styles.pickEmoji}>{r.emoji}</Text>
              </Pressable>
            ))}
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

export default ReactionBar;
