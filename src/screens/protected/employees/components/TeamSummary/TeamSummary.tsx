import { Pressable, Text, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { UsersIcon } from "@shared/icons";
import { c, gradients } from "@theme/colors";
import type { EmployeeFilter } from "@typings/team";
import { styles } from "./TeamSummary.styles";
import type { TeamSummaryProps } from "./TeamSummary.types";

const CELLS: { key: Exclude<EmployeeFilter, "all">; label: string; color: string }[] = [
  { key: "in", label: "İşdə", color: c.ok },
  { key: "done", label: "Bitirib", color: c.primary },
  { key: "leave", label: "İcazəli", color: c.violet },
  { key: "none", label: "Gəlməyib", color: c.faint },
];

// Komanda xülasəsi: usta sayı, vəziyyətə görə rəngli zolaq və toxunuşla süzgəc (eyni xanaya təkrar toxunuş süzgəci silir)
function TeamSummary({ total, counts, filter, onChange }: TeamSummaryProps) {
  return (
    <View style={styles.card}>
      <GradientBg colors={gradients.hero} radius={24} />
      <View style={styles.top}>
        <View style={styles.tile}><UsersIcon size={22} color={c.primary} /></View>
        <View>
          <Text style={styles.kicker}>KOMANDA · BU GÜN</Text>
          <Text style={styles.big}>{total} <Text style={styles.bigSub}>usta</Text></Text>
        </View>
      </View>
      <View style={styles.bar}>
        {CELLS.map((x) => counts[x.key] > 0 && <View key={x.key} style={[styles.seg, { flex: counts[x.key], backgroundColor: x.color }]} />)}
      </View>
      <View style={styles.row}>
        {CELLS.map((x) => {
          const on = filter === x.key;
          return (
            <Pressable key={x.key} onPress={() => onChange(on ? "all" : x.key)} style={[styles.cell, on && styles.on]} accessibilityLabel={`${x.label}: ${counts[x.key]}`}>
              <Text style={[styles.num, { color: counts[x.key] ? x.color : c.faint }]}>{counts[x.key]}</Text>
              <Text style={[styles.label, on && styles.labelOn]} numberOfLines={1}>{x.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default TeamSummary;
