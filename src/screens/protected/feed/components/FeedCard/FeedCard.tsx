import { Image } from "expo-image";
import { memo } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { FileTextIcon, VideoIcon } from "@shared/icons";
import { feedWhen } from "@shared/utils/feed";
import { c } from "@theme/colors";
import { styles } from "./FeedCard.styles";
import type { FeedCardProps } from "./FeedCard.types";

const SHOW = 6; // kartda ən çox 6 fayl önizləməsi, qalanı "+N"

// Lent kartı (WhatsApp mesajı kimi): usta + vaxt, yer, yazı, fayllar. Şəkil → tam ekran (yana sürüşdür); video/PDF → telefonun öz tətbiqi. memo
function FeedCard({ post, onImages }: FeedCardProps) {
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
      <Text style={styles.place}>{post.place}</Text>
      {post.company ? <Text style={styles.company}>{post.company}</Text> : null}
      {post.description ? <Text style={styles.desc}>{post.description}</Text> : null}
      <View style={styles.grid}>
        {shown.map((f, i) => {
          const img = f.kind !== "video" && !f.path.endsWith(".pdf") && !!f.url;
          const open = () => (img ? onImages(images, images.indexOf(f.url as string)) : f.url && void Linking.openURL(f.url));
          return (
            <Pressable key={f.id} onPress={open} style={styles.cell} accessibilityLabel={f.kind === "video" ? "Video" : f.kind === "act" ? "Akt" : "Şəkil"}>
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
    </View>
  );
}

export default memo(FeedCard);
