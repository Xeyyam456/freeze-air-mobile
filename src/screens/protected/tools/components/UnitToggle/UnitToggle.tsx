import { Pressable, Text, View } from "react-native";
import { styles } from "./UnitToggle.styles";
import type { UnitToggleProps } from "./UnitToggle.types";

// Kiçik ikili seçim: "balon | kq", "işlətdim | məndə qalır". value=true → birinci seçim aktivdir
function UnitToggle({ value, onChange, on, off }: UnitToggleProps) {
  return (
    <View style={styles.row}>
      {([[true, on], [false, off]] as const).map(([v, label]) => (
        <Pressable key={label} onPress={() => onChange(v)} style={[styles.item, value === v && styles.active]} accessibilityLabel={label}>
          <Text style={[styles.text, value === v && styles.textOn]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default UnitToggle;
