import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { EMOJI_CATEGORIES } from "@shared/config/emojis";
import { styles } from "./EmojiPicker.styles";
import type { EmojiPickerProps } from "./EmojiPicker.types";

const COLS = 8;

// Smaylik paketi: üstdə kateqoriyalar (üz, əl, ürək, iş, təbiət), altda 8 sütunlu şəbəkə; toxunuş emojini seçir (panel açıq qalır, bir neçə seçmək olar)
function EmojiPicker({ onPick, height = 250 }: EmojiPickerProps) {
  const [cat, setCat] = useState(0);
  return (
    <View style={[styles.box, { height }]}>
      <View style={styles.tabs}>
        {EMOJI_CATEGORIES.map((g, i) => (
          <Pressable key={g.key} onPress={() => setCat(i)} style={[styles.tab, cat === i && styles.tabOn]} accessibilityLabel={g.key}>
            <Text style={styles.tabEmoji}>{g.icon}</Text>
          </Pressable>
        ))}
      </View>
      <FlashList
        key={cat}
        data={EMOJI_CATEGORIES[cat].list}
        numColumns={COLS}
        keyExtractor={(e) => e}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPick(item)} style={styles.cell}><Text style={styles.emoji}>{item}</Text></Pressable>
        )}
      />
    </View>
  );
}

export default EmojiPicker;
