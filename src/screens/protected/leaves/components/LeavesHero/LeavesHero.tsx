import { Text, View } from "react-native";
import Button from "@shared/components/Button";
import GradientBg from "@shared/components/GradientBg";
import { CalendarOffIcon, SendIcon } from "@shared/icons";
import { leaveRange } from "@shared/utils/leaves";
import { c, gradients } from "@theme/colors";
import { styles } from "./LeavesHero.styles";
import type { LeavesHeroProps } from "./LeavesHero.types";

// Xülasə (web LeavesHero): bu il icazə günü (iri), bu ay, növbəti icazə, gözləyən + "İcazə istə"
function LeavesHero({ stats, onRequest }: LeavesHeroProps) {
  const cells = [
    { label: "Bu ay", value: `${stats.month} gün` },
    { label: "Növbəti", value: stats.next ? leaveRange(stats.next) : "Yoxdur", dim: !stats.next },
    { label: "Gözləyən", value: String(stats.pending), accent: stats.pending > 0 },
  ];
  return (
    <View style={styles.card}>
      <GradientBg colors={gradients.hero} radius={24} />
      <View style={styles.top}>
        <View style={styles.tile}><CalendarOffIcon size={22} color={c.primary} /></View>
        <View>
          <Text style={styles.kicker}>İCAZƏLƏRİM</Text>
          <Text style={styles.big}>{stats.year} gün <Text style={styles.bigSub}>bu il</Text></Text>
        </View>
      </View>
      <View style={styles.cells}>
        {cells.map((x) => (
          <View key={x.label} style={styles.cell}>
            <Text style={styles.cellLabel}>{x.label}</Text>
            <Text style={[styles.cellValue, x.dim && styles.dim, x.accent && styles.accent]} numberOfLines={1}>{x.value}</Text>
          </View>
        ))}
      </View>
      <Button title="İcazə istə" variant="gradient" icon={SendIcon} onPress={onRequest} />
    </View>
  );
}

export default LeavesHero;
