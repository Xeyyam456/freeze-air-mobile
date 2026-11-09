import { Image } from "expo-image";
import { memo, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import FileArt from "@screens/protected/feed/components/FileArt";
import type { FeedFile } from "@typings/feed";
import { styles } from "./MediaGrid.styles";
import type { MediaGridProps } from "./MediaGrid.types";

const GAP = 8; // xanalar bir-birinə yapışmır: hər biri ayrı yuvarlaq kart
const MAX = 9; // ən çox 9 xana, qalanı sonuncunun üstündə "+N"
const isImg = (f: FeedFile) => f.kind !== "video" && !f.path.endsWith(".pdf") && !!f.url;

// Fayl sayına görə kollaj (Telegram/WhatsApp kimi səliqəli): 1 = tək kart (3-lü sətir ölçüsündə), 2 = yan-yana, 3 = bir sətirdə 3 ayrı kart,
// 4 = 2×2, 5+ = 3-lü tor. Şəkil → tam ekran; video/PDF → telefonun öz tətbiqi. Hər xana ayrı yuvarlaq kartdır (aralarında 8 px). memo
function MediaGrid({ files, onImages }: MediaGridProps) {
  const [w, setW] = useState(0);
  const images = files.filter(isImg).map((f) => f.url as string);
  const shown = files.slice(0, MAX);
  const rest = files.length - MAX;
  const n = shown.length;

  const cell = (f: FeedFile, i: number, width: number, height: number) => {
    const img = isImg(f);
    const open = () => (img ? onImages(images, images.indexOf(f.url as string)) : f.url && void Linking.openURL(f.url));
    return (
      <Pressable key={f.id} onPress={open} style={[styles.cell, { width, height }]} accessibilityLabel={f.kind === "video" ? "Video" : f.kind === "act" ? "Akt" : "Şəkil"}>
        {img ? <Image source={{ uri: f.url }} style={styles.image} contentFit="cover" cachePolicy="disk" transition={150} /> : <FileArt kind={f.kind === "video" ? "video" : "pdf"} />}
        {img && f.kind === "act" ? <Text style={styles.badge}>Akt</Text> : null}
        {i === MAX - 1 && rest > 0 ? <View style={styles.more}><Text style={styles.moreText}>+{rest + 1}</Text></View> : null}
      </Pressable>
    );
  };

  const half = Math.floor((w - GAP) / 2);
  const third = Math.floor((w - GAP * 2) / 3);
  let body = null;
  if (w && n === 1) body = cell(shown[0], 0, third, third); // tək şəkil də 3-lü sətirdəki ölçüdə kart (istifadəçi)
  else if (w && n === 2) body = <View style={styles.row}>{shown.map((f, i) => cell(f, i, half, Math.round(half * 0.8)))}</View>;
  else if (w && n === 3) body = <View style={styles.row}>{shown.map((f, i) => cell(f, i, third, third))}</View>; // bir sətirdə 3 ayrı kart (istifadəçi)
  else if (w && n === 4) body = <View style={styles.wrap}>{shown.map((f, i) => cell(f, i, half, Math.round(half * 0.72)))}</View>;
  else if (w) body = <View style={styles.wrap}>{shown.map((f, i) => cell(f, i, third, third))}</View>;

  return <View style={styles.box} onLayout={(e) => setW(Math.floor(e.nativeEvent.layout.width))}>{body}</View>;
}

export default memo(MediaGrid);
