import { Text, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { BuildingIcon } from "@shared/icons";
import { styles } from "./CompanySummary.styles";
import type { CompanySummaryProps } from "./CompanySummary.types";

// Xülasə (web "ClientSummary"): tünd mavi kart, frost işıq; neçə şirkət + filial cəmi, sabit məkan, koordinatlı %, bu ay iş
function CompanySummary({ count, units, fixed, coordPct, works }: CompanySummaryProps) {
  const cells: { l: string; v: string | number; tone?: string }[] = [
    { l: "Filial cəmi", v: units }, { l: "Sabit məkan", v: fixed },
    ...(coordPct !== null ? [{ l: "Koordinatlı", v: `${coordPct}%` }] : []),
    { l: "Bu ay iş", v: works, tone: "#22c3e6" },
  ];
  return (
    <View style={styles.card}>
      <GradientBg colors={["#0c1b36", "#0a1630"]} glow="#22c3e6" radius={24} />
      <View style={styles.top}>
        <View style={styles.tile}><BuildingIcon size={26} color="#22c3e6" /></View>
        <View><Text style={styles.kicker}>ŞİRKƏTLƏR</Text><Text style={styles.count}>{count} şirkət</Text></View>
      </View>
      <View style={styles.grid}>
        {cells.map((x) => (
          <View key={x.l} style={styles.cell}><Text style={styles.label}>{x.l}</Text><Text style={[styles.value, x.tone ? { color: x.tone } : null]}>{x.v}</Text></View>
        ))}
      </View>
    </View>
  );
}

export default CompanySummary;
