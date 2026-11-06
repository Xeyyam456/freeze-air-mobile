import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FileTextIcon, ImagePlusIcon, VideoIcon } from "@shared/icons";
import SourceMenu from "@screens/protected/taskNote/components/SourceMenu";
import { formatSeconds } from "@shared/utils/media";
import { c } from "@theme/colors";
import type { PickSource } from "@typings/taskNote";
import { styles } from "./FileTiles.styles";
import type { FileTilesProps, TileKey } from "./FileTiles.types";

const MENU: Record<TileKey, { title: string; sources: PickSource[] }> = {
  act: { title: "Akt", sources: ["camera", "gallery", "pdf"] },
  photos: { title: "Şəkillər", sources: ["camera", "gallery"] },
  video: { title: "Video", sources: ["camera", "gallery"] },
};

// Üç plitə: Akt / Şəkillər / Video. Toxunanda mənbə menyusu açılır (kamera, qalereya, PDF)
function FileTiles({ form: f, pickers }: FileTilesProps) {
  const [open, setOpen] = useState<TileKey | null>(null);
  const tiles = [
    { key: "act" as const, icon: FileTextIcon, title: "Akt", hint: f.act ? "yeni akt seçildi" : f.hasAct ? "yenisi köhnəni əvəz edir" : "şəkil və ya PDF", on: !!f.act },
    { key: "photos" as const, icon: ImagePlusIcon, title: "Şəkillər", hint: f.photos.length ? `${f.photos.length} yeni şəkil` : "bir neçə şəkil", on: f.photos.length > 0 },
    { key: "video" as const, icon: VideoIcon, title: "Video",
      hint: f.video ? `${formatSeconds(f.video.seconds ?? 0)} · seçildi` : "bir video",
      on: !!f.video },
  ];
  const run = { act: pickers.pickAct, photos: pickers.pickPhotos, video: pickers.pickVideo };

  return (
    <View style={styles.row}>
      {tiles.map(({ key, icon: Icon, title, hint, on }) => (
        <Pressable key={key} onPress={() => setOpen(key)}
          style={({ pressed }) => [styles.tile, on && styles.on, pressed && styles.pressed]}>
          <Icon size={20} color={c.primary} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.hint} numberOfLines={1}>{hint}</Text>
        </Pressable>
      ))}
      {open && <SourceMenu title={MENU[open].title} sources={MENU[open].sources} onClose={() => setOpen(null)}
        onPick={(s) => void run[open](s)} />}
    </View>
  );
}

export default FileTiles;
