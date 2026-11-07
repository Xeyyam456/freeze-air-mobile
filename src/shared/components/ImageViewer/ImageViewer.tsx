import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Modal, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./ImageViewer.styles";
import type { ImageViewerProps } from "./ImageViewer.types";

// Tam ekran şəkil baxışı: yana sürüşdürüb növbətiyə keç, sayğac "2 / 5". X və telefonun "geri"si bağlayır
function ImageViewer({ images, start, onClose }: ImageViewerProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(start);
  return (
    <Modal transparent={false} animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={styles.root}>
        <FlashList horizontal pagingEnabled data={images} keyExtractor={(u) => u} initialScrollIndex={start} showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Image source={{ uri: item }} style={{ width, height }} contentFit="contain" cachePolicy="disk" />}
          onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))} />
        <Pressable onPress={onClose} hitSlop={12} style={[styles.close, { top: insets.top + 12 }]} accessibilityLabel="Bağla">
          <CloseIcon size={20} color={c.ink} />
        </Pressable>
        {images.length > 1 ? <Text style={[styles.count, { bottom: insets.bottom + 20 }]}>{index + 1} / {images.length}</Text> : null}
      </View>
    </Modal>
  );
}

export default ImageViewer;
