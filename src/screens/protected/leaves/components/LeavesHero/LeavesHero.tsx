import { Text, View } from "react-native";
import Button from "@shared/components/Button";
import GradientBg from "@shared/components/GradientBg";
import { CalendarOffIcon, SendIcon } from "@shared/icons";
import { c, gradients } from "@theme/colors";
import { styles } from "./LeavesHero.styles";
import type { LeavesHeroProps } from "./LeavesHero.types";

// Xülasə: bu ay icazə günü + "İcazə istə" (gözləyən/növbəti sorğular aşağıda siyahıdadır)
function LeavesHero({ stats, onRequest }: LeavesHeroProps) {
  return (
    <View style={styles.card}>
      <GradientBg colors={gradients.hero} radius={24} />
      <View style={styles.top}>
        <View style={styles.tile}><CalendarOffIcon size={22} color={c.primary} /></View>
        <View>
          <Text style={styles.kicker}>İCAZƏLƏRİM · BU AY</Text>
          <Text style={styles.big}>{stats.month} gün <Text style={styles.bigSub}>icazə</Text></Text>
        </View>
      </View>
      <Button title="İcazə istə" variant="gradient" icon={SendIcon} onPress={onRequest} />
    </View>
  );
}

export default LeavesHero;
