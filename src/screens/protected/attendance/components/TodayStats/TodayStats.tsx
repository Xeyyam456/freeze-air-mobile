import { Text, View } from "react-native";
import { c } from "@theme/colors";
import { styles } from "./TodayStats.styles";
import type { TodayStatsProps } from "./TodayStats.types";

// Bu gün (yalnız cari ay): web-dəki 6 göstərici bir şüşəvari kartda, 3×2. Rəqəm sıfırdan böyükdürsə öz rəngində
function TodayStats({ totals: t, ready }: TodayStatsProps) {
  const items = [
    { label: "Hazırda işdə", value: t.here, color: c.ok },
    { label: "İşi bitirib", value: t.done, color: c.ink },
    { label: "İcazəli", value: t.leave, color: c.violet },
    { label: "Hələ gəlməyib", value: t.missing, color: c.ink },
    { label: "İşdə olmayıb", value: t.absent, color: c.danger },
    { label: "Gözləyən icazə", value: t.pending, color: c.primary },
  ];
  return (
    <View style={styles.card}>
      <Text style={styles.head}>Bu gün</Text>
      <View style={styles.grid}>
        {items.map((x) => (
          <View key={x.label} style={styles.cell}>
            <Text style={[styles.value, { color: ready && x.value ? x.color : c.faint }]}>{ready ? x.value : "–"}</Text>
            <Text style={styles.label} numberOfLines={1}>{x.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default TodayStats;
