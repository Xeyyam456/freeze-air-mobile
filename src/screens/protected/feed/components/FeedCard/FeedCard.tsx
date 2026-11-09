import { memo } from "react";
import { Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import PartnerLines from "@shared/components/PartnerLines";
import { MapPinIcon } from "@shared/icons";
import MediaGrid from "@screens/protected/feed/components/MediaGrid";
import { timeBaku } from "@shared/utils/helpers/time";
import ReactionBar from "../ReactionBar";
import { PLACE, styles } from "./FeedCard.styles";
import type { FeedCardProps } from "./FeedCard.types";

// Lent kartı (yığcam, səliqəli): başlıqda usta + altında yer (rəngli) və şirkət, sağda yalnız saat (gün — siyahının gün başlığında);
// birlikdə işləyənlər, yazı (ən çox 4 sətir), fayllar kollaj kimi (MediaGrid), nazik ayırıcı, altda ReactionBar. memo
function FeedCard({ post, mine, onImages, onReact, onReactors, onComments }: FeedCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Avatar name={post.name} photo={post.photo} size={42} />
        <View style={styles.who}>
          <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
          <View style={styles.placeRow}>
            <MapPinIcon size={13} color={PLACE} />
            <Text style={styles.place} numberOfLines={1}>{post.place}{post.company ? <Text style={styles.company}>  ·  {post.company}</Text> : null}</Text>
          </View>
        </View>
        <Text style={styles.time}>{timeBaku(post.at)}</Text>
      </View>
      <PartnerLines names={post.partners} />
      {post.description ? <Text style={styles.desc} numberOfLines={4}>{post.description}</Text> : null}
      {post.files.length ? <MediaGrid files={post.files} onImages={onImages} /> : null}
      <View style={styles.divider} />
      <ReactionBar post={post} mine={mine} onReact={onReact} onReactors={onReactors} onComments={onComments} />
    </View>
  );
}

export default memo(FeedCard);
