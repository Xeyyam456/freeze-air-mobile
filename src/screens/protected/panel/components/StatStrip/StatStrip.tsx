import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import CountUp from "@shared/components/CountUp";
import { c } from "@theme/colors";
import { styles } from "./StatStrip.styles";
import type { StatStripProps } from "./StatStrip.types";

// Bir şüşəvari zolaqda 3 rəqəm: Bu gün · Bu ay (keçən ay / ötdün) · Tapşırıq (görülən/cəmi). İnce ayırıcı xətlər.
function StatStrip({ stats, overview }: StatStripProps) {
  const diff = overview ? overview.monthTotal - overview.prevTotal : null;
  const t = stats?.tasks;
  const left = t ? t.total - t.done : 0;

  return (
    <Animated.View entering={FadeInDown.delay(120).duration(420)} style={styles.strip}>
      <View style={styles.cell}>
        {stats ? <CountUp value={stats.today} style={styles.value} /> : <Text style={styles.value}>–</Text>}
        <Text style={styles.label}>Bu gün</Text>
        <Text style={styles.sub}>iş yazılıb</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.cell}>
        {overview ? <CountUp value={overview.monthTotal} style={styles.value} /> : <Text style={styles.value}>–</Text>}
        <Text style={styles.label}>Bu ay</Text>
        {/* Ayın əvvəlində bütün keçən ayla müqayisə yanıldıcıdır (qırmızı ▼): neytral göstərilir, keçəni ötəndə yaşıl ▲ */}
        {overview && (
          <Text style={[styles.sub, diff !== null && diff > 0 && { color: c.ok }]}>{diff !== null && diff > 0 ? `▲ keçən ayı ötdün` : `keçən ay: ${overview.prevTotal}`}</Text>
        )}
      </View>
      <View style={styles.divider} />
      <View style={styles.cell}>
        <Text style={styles.value}>{t ? `${t.done}/${t.total}` : "–"}</Text>
        <Text style={styles.label}>Tapşırıq</Text>
        <Text style={[styles.sub, t && t.total > 0 && left === 0 && { color: c.ok }]}>
          {!t ? " " : t.total === 0 ? "bu gün yoxdur" : left === 0 ? "hamısı görülüb" : `${left} qalıb`}
        </Text>
      </View>
    </Animated.View>
  );
}

export default StatStrip;
