import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import PartnerLines from "@shared/components/PartnerLines";
import { ChevronRightIcon } from "@shared/icons";
import { c } from "@theme/colors";
import type { PersonStatus } from "@typings/team";
import { styles } from "./PersonCard.styles";
import type { PersonCardProps } from "./PersonCard.types";

const TONE: Record<PersonStatus["kind"], string> = { in: c.ok, done: c.primary, leave: c.violet, none: c.faint };

// Usta/rəhbər kartı (kompakt): şəklin ətrafında vəziyyət halqası, ad + ixtisas + bugünkü vəziyyət, sağda "bu gün / bu ay" iş sayı;
// toxunuş → məlumat pəncərəsi. memo: FlashList sətri
function PersonCard({ person, subtitle, badge, highlight, status, partners, stats, onPress }: PersonCardProps) {
  const tone = status ? TONE[status.kind] : null;
  const avatar = <Avatar name={person.full_name} photo={person.photo_url} size={48} />;
  return (
    <Pressable onPress={() => onPress(person)} style={({ pressed }) => [styles.card, highlight && styles.me, pressed && styles.pressed]} accessibilityLabel={`${person.full_name}: məlumatlara bax`}>
      {tone ? <View style={[styles.ring, { borderColor: tone }]}>{avatar}</View> : avatar}
      <View style={styles.text}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{person.full_name}</Text>
          {badge ? <Text style={styles.badge}>{badge}</Text> : null}
        </View>
        <Text style={styles.sub} numberOfLines={1}>{subtitle}</Text>
        {status && tone ? (
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: tone }]} />
            <Text style={[styles.status, { color: status.kind === "none" ? c.muted : tone }]} numberOfLines={1}>{status.text}</Text>
          </View>
        ) : null}
        {partners?.length ? <PartnerLines names={partners} /> : null}
      </View>
      {stats ? (
        <View style={styles.stats}>
          {stats.map((s, i) => (
            <View key={s.label} style={styles.stats}>
              {i > 0 && <View style={styles.divider} />}
              <View style={styles.stat}>
                <Text style={[styles.statValue, s.value > 0 && { color: i ? c.primary : c.ok }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : <ChevronRightIcon size={18} color={c.faint} />}
    </Pressable>
  );
}

export default memo(PersonCard);
