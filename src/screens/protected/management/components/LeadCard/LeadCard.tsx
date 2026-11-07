import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import GradientBg from "@shared/components/GradientBg";
import { BriefcaseIcon, CrownIcon, PhoneIcon } from "@shared/icons";
import { experience } from "@shared/utils/team";
import { c, gradients } from "@theme/colors";
import { styles } from "./LeadCard.styles";
import type { LeadCardProps } from "./LeadCard.types";

// Müdirin iri kartı (rəhbərliyin başı); toxunuş → məlumat pəncərəsi
function LeadCard({ person, onPress }: LeadCardProps) {
  const exp = experience(person.start_date);
  return (
    <Pressable onPress={() => onPress(person)} style={styles.card} accessibilityLabel={`${person.full_name}: məlumatlara bax`}>
      <GradientBg colors={gradients.hero} radius={24} />
      <Avatar name={person.full_name} photo={person.photo_url} size={72} />
      <View style={styles.badge}><CrownIcon size={12} color={c.primary} /><Text style={styles.badgeText}>{person.position}</Text></View>
      <Text style={styles.name} numberOfLines={2}>{person.full_name}</Text>
      <View style={styles.row}><BriefcaseIcon size={14} color={c.muted} /><Text style={styles.meta}>{exp ? `Təcrübə: ${exp}` : "Təcrübə yazılmayıb"}</Text></View>
      <View style={styles.row}><PhoneIcon size={14} color={c.muted} /><Text style={styles.meta}>{person.phone ?? "Telefon yazılmayıb"}</Text></View>
    </Pressable>
  );
}

export default LeadCard;
