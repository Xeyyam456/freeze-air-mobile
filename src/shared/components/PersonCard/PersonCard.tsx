import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import Pill from "@shared/components/Pill";
import { ChevronRightIcon } from "@shared/icons";
import { c } from "@theme/colors";
import type { PersonStatus } from "@typings/team";
import { styles } from "./PersonCard.styles";
import type { PersonCardProps } from "./PersonCard.types";

const TONE: Record<PersonStatus["kind"], { fg: string; bg: string }> = {
  in: { fg: c.ok, bg: c.okSoft },
  done: { fg: c.primary, bg: c.primarySoft },
  leave: { fg: c.violet, bg: c.violetSoft },
  none: { fg: c.muted, bg: c.glass },
};

// Usta/rəhbər kartı: şəkil, ad, ixtisas/vəzifə, bugünkü vəziyyət, iş sayları; toxunuş → məlumat pəncərəsi. memo: FlashList sətri
function PersonCard({ person, subtitle, badge, status, stats, onPress }: PersonCardProps) {
  return (
    <Pressable onPress={() => onPress(person)} style={({ pressed }) => [styles.card, pressed && styles.pressed]} accessibilityLabel={`${person.full_name}: məlumatlara bax`}>
      <View style={styles.top}>
        <Avatar name={person.full_name} photo={person.photo_url} size={48} />
        <View style={styles.text}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{person.full_name}</Text>
            {badge ? <Text style={styles.badge}>{badge}</Text> : null}
          </View>
          <Text style={styles.sub} numberOfLines={1}>{subtitle}</Text>
        </View>
        <ChevronRightIcon size={18} color={c.faint} />
      </View>
      {status ? <View style={styles.status}><Pill text={status.text} color={TONE[status.kind].fg} bg={TONE[status.kind].bg} /></View> : null}
      {stats ? (
        <View style={styles.stats}>
          {stats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={[styles.statValue, s.value > 0 && { color: c.primary }]}>{s.value}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

export default memo(PersonCard);
