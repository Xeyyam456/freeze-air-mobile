import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { REACTIONS } from "@shared/config/reactions";
import { SmilePlusIcon, TrashIcon } from "@shared/icons";
import { feedWhen } from "@shared/utils/feed";
import { c } from "@theme/colors";
import { styles } from "./CommentBubble.styles";
import type { CommentBubbleProps } from "./CommentBubble.types";

// Bir şərh (söhbət qabarcığı): başqalarınınkı solda (şəkil + ad), mənimki sağda; silmək — öz şərhi və ya rəhbərlik.
// Altda şərhə verilən reaksiyalar (çiplər) və gülüş ikonu: toxunanda 5 emoji sırası açılır, seçən kimi göndərilir
function CommentBubble({ comment: cm, mine, canDelete, canReact, onDelete, onReact }: CommentBubbleProps) {
  const [open, setOpen] = useState(false);
  const given = REACTIONS.filter((r) => cm.reactions?.[r.kind]);
  const showRx = cm.id > 0 && (given.length > 0 || canReact);
  return (
    <View style={[styles.row, mine && styles.rowMine]}>
      {!mine ? <Avatar name={cm.name} photo={cm.photo} size={32} /> : null}
      <View style={[styles.col, mine && styles.colMine]}>
        <View style={[styles.bubble, mine && styles.bubbleMine]}>
          {!mine ? <Text style={styles.name} numberOfLines={1}>{cm.name}</Text> : null}
          <Text style={styles.body}>{cm.body}</Text>
          <View style={styles.meta}>
            <Text style={styles.when}>{feedWhen(cm.at)}</Text>
            {cm.id > 0 && canDelete ? (
              <Pressable onPress={() => onDelete(cm)} hitSlop={10} accessibilityLabel="Şərhi sil"><TrashIcon size={14} color={c.faint} /></Pressable>
            ) : null}
          </View>
        </View>
        {showRx ? (
          <View style={styles.rx}>
            {given.map((r) => (
              <Pressable key={r.kind} onPress={() => canReact && onReact(cm, r.kind)} style={[styles.chip, cm.mine === r.kind && styles.chipOn]} accessibilityLabel={`${cm.reactions[r.kind]} ${r.label}`}>
                <Text style={styles.chipEmoji}>{r.emoji}</Text>
                <Text style={[styles.chipCount, cm.mine === r.kind && { color: c.primary }]}>{cm.reactions[r.kind]}</Text>
              </Pressable>
            ))}
            {canReact ? (
              <Pressable onPress={() => setOpen((o) => !o)} hitSlop={6} style={styles.smile} accessibilityLabel="Reaksiya ver">
                <SmilePlusIcon size={15} color={open || cm.mine ? c.primary : c.muted} strokeWidth={2.1} />
              </Pressable>
            ) : null}
          </View>
        ) : null}
        {open ? (
          <View style={styles.pickRow}>
            {REACTIONS.map((r) => (
              <Pressable key={r.kind} onPress={() => { setOpen(false); onReact(cm, r.kind); }} style={[styles.pick, cm.mine === r.kind && styles.pickOn]} accessibilityLabel={r.label}>
                <Text style={styles.pickEmoji}>{r.emoji}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default memo(CommentBubble);
