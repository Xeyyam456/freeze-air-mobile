import { Image } from "expo-image";
import { memo, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import PartnerLines from "@shared/components/PartnerLines";
import { FileTextIcon, MapPinIcon, VideoIcon } from "@shared/icons";
import { feedWhen } from "@shared/utils/feed";
import { c } from "@theme/colors";
import ReactionBar from "../ReactionBar";
import { PLACE, styles } from "./FeedCard.styles";
import type { FeedCardProps } from "./FeedCard.types";

const COLS = 3; // şəkillər sətir üzrə 3-3
const GAP = 6;
const SHOW = 9; // kartda ən çox 3 sətir (9 fayl), qalanı "+N"

// Lent kartı (WhatsApp mesajı kimi): usta + vaxt, yer (rəngli), birlikdə işləyən ustalar, yazı, fayllar (3-3 düz sıra),
// altda: ReactionBar (şərh + reaksiyalar). Şəkil → tam ekran; video/PDF → telefonun öz tətbiqi.
// memo
function FeedCard({ post, mine, onImages, onReact, onReactors, onComments }: FeedCardProps) {
  const [cell, setCell] = useState(0); // xana ölçüsü: torun enindən (3 bərabər sütun, boşluq GAP)
  const images = post.files.filter((f) => f.kind !== "video" && !f.path.endsWith(".pdf") && f.url).map((f) => f.url as string);
  const shown = post.files.slice(0, SHOW);
  const rest = post.files.length - SHOW;
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Avatar name={post.name} photo={post.photo} size={40} />
        <View style={styles.who}>
          <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
          <Text style={styles.when}>{feedWhen(post.at)}</Text>
        </View>
      </View>
      <View style={styles.placeRow}>
        <MapPinIcon size={18} color={PLACE} />
        <Text style={styles.place}>{post.place}</Text>
      </View>
      {post.company ? <Text style={styles.company}>{post.company}</Text> : null}
      <PartnerLines names={post.partners} />
      {post.description ? <Text style={styles.desc}>{post.description}</Text> : null}
      <View style={styles.grid} onLayout={(e) => setCell(Math.floor((e.nativeEvent.layout.width - GAP * (COLS - 1)) / COLS))}>
        {cell > 0 && shown.map((f, i) => {
          const img = f.kind !== "video" && !f.path.endsWith(".pdf") && !!f.url;
          const open = () => (img ? onImages(images, images.indexOf(f.url as string)) : f.url && void Linking.openURL(f.url));
          return (
            <Pressable key={f.id} onPress={open} style={[styles.cell, { width: cell, height: cell }]} accessibilityLabel={f.kind === "video" ? "Video" : f.kind === "act" ? "Akt" : "Şəkil"}>
              {img ? <Image source={{ uri: f.url }} style={styles.image} contentFit="cover" cachePolicy="disk" /> : (
                <View style={styles.tile}>
                  {f.kind === "video" ? <VideoIcon size={26} color={c.primary} /> : <FileTextIcon size={26} color={c.primary} />}
                  <Text style={styles.tileText}>{f.kind === "video" ? "Video" : f.path.endsWith(".pdf") ? "PDF akt" : "Şəkil"}</Text>
                </View>
              )}
              {img && f.kind === "act" ? <Text style={styles.badge}>Akt</Text> : null}
              {i === SHOW - 1 && rest > 0 ? <View style={styles.more}><Text style={styles.moreText}>+{rest + 1}</Text></View> : null}
            </Pressable>
          );
        })}
      </View>
      <ReactionBar post={post} mine={mine} onReact={onReact} onReactors={onReactors} onComments={onComments} />
    </View>
  );
}

export default memo(FeedCard);
