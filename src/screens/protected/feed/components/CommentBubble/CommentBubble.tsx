import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { TrashIcon } from "@shared/icons";
import { feedWhen } from "@shared/utils/feed";
import { c } from "@theme/colors";
import { styles } from "./CommentBubble.styles";
import type { CommentBubbleProps } from "./CommentBubble.types";

// Bir şərh (söhbət qabarcığı): başqalarınınkı solda (şəkil + ad), mənimki sağda; silmək — öz şərhi və ya rəhbərlik
function CommentBubble({ comment: cm, mine, canDelete, onDelete }: CommentBubbleProps) {
  return (
    <View style={[styles.row, mine && styles.rowMine]}>
      {!mine ? <Avatar name={cm.name} photo={cm.photo} size={32} /> : null}
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
    </View>
  );
}

export default memo(CommentBubble);
