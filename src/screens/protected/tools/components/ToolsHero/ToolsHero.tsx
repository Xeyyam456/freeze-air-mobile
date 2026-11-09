import { Text, View } from "react-native";
import Button from "@shared/components/Button";
import GradientBg from "@shared/components/GradientBg";
import { HandIcon, WrenchIcon } from "@shared/icons";
import { c, gradients } from "@theme/colors";
import { styles } from "./ToolsHero.styles";
import type { ToolsHeroProps } from "./ToolsHero.types";

// Xülasə: üstündə neçə alət, 3 göstərici (material növü, təsdiq gözləyən, gözləyən sorğu) + "Alət istə" / "Material istə"
function ToolsHero({ tools, materials, toConfirm, pending, kind, onAsk }: ToolsHeroProps) {
  const cells = [
    { l: "Material", v: `${materials} növ`, tone: undefined as string | undefined },
    { l: "Təsdiq", v: toConfirm, tone: toConfirm ? c.orange : undefined },
    { l: "Sorğu", v: pending, tone: pending ? c.violet : undefined },
  ];
  return (
    <View style={styles.card}>
      <GradientBg colors={gradients.hero} radius={24} />
      <View style={styles.top}>
        <View style={styles.tile}><WrenchIcon size={22} color={c.primary} /></View>
        <View>
          <Text style={styles.kicker}>MƏNDƏ OLAN ALƏT</Text>
          <Text style={styles.big}>{tools} <Text style={styles.bigSub}>ədəd</Text></Text>
        </View>
      </View>
      <View style={styles.grid}>
        {cells.map((x) => (
          <View key={x.l} style={styles.cell}>
            <Text style={styles.label} numberOfLines={1}>{x.l}</Text>
            <Text style={[styles.value, x.tone ? { color: x.tone } : null]}>{x.v}</Text>
          </View>
        ))}
      </View>
      <Button title={kind === "material" ? "Material istə" : "Alət istə"} variant="gradient" icon={HandIcon} onPress={onAsk} />
    </View>
  );
}

export default ToolsHero;
