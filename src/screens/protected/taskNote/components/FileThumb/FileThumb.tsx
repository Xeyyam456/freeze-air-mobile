import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { CloseIcon, FileTextIcon, VideoIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./FileThumb.styles";
import type { FileThumbProps } from "./FileThumb.types";

// Bir fayl: şəkil önizləməsi, akt/video isə ikonlu plitə. Küncdəki × silir (mövcud faylda — silməyə işarələyir)
function FileThumb({ kind, uri, pdf, dimmed, onRemove }: FileThumbProps) {
  const image = kind !== "video" && !pdf && uri;
  return (
    <View style={[styles.wrap, dimmed && styles.dimmed]}>
      {image ? (
        <Image source={{ uri }} style={styles.image} contentFit="cover" cachePolicy="disk" />
      ) : (
        <View style={styles.tile}>
          {kind === "video" ? <VideoIcon size={18} color={c.primary} /> : <FileTextIcon size={18} color={c.primary} />}
          <Text style={styles.label}>{kind === "video" ? "Video" : "Akt"}</Text>
        </View>
      )}
      {image && kind === "act" && <Text style={styles.badge}>Akt</Text>}
      <Pressable onPress={onRemove} hitSlop={8} style={[styles.x, dimmed && styles.xOff]}
        accessibilityLabel={dimmed ? "Silməni ləğv et" : "Faylı sil"}>
        <CloseIcon size={11} color={c.white} strokeWidth={3} />
      </Pressable>
    </View>
  );
}

export default FileThumb;
