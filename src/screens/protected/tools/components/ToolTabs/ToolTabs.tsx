import { Pressable, Text, View } from "react-native";
import { styles } from "./ToolTabs.styles";
import type { ToolTabsProps } from "./ToolTabs.types";

// Alətlər | Materiallar seqmenti (say ilə): "Məndə olanlar"da və "Alət istə" panelində
function ToolTabs({ value, onChange, tools, materials }: ToolTabsProps) {
  const items = [["tool", "Alətlər", tools], ["material", "Materiallar", materials]] as const;
  return (
    <View style={styles.row}>
      {items.map(([k, label, n]) => (
        <Pressable key={k} onPress={() => onChange(k)} style={[styles.tab, value === k && styles.on]} accessibilityLabel={label}>
          <Text style={[styles.text, value === k && styles.textOn]}>{label}</Text>
          {n !== undefined ? <Text style={[styles.count, value === k && styles.textOn]}>{n}</Text> : null}
        </Pressable>
      ))}
    </View>
  );
}

export default ToolTabs;
