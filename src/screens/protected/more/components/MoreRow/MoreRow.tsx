import { Pressable, Text, View } from "react-native";
import { ChevronRightIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./MoreRow.styles";
import type { MoreRowProps } from "./MoreRow.types";

// Menyu sətri: rəngli ikon plitəsi, ad, qısa izah, sağda ox
function MoreRow({ link: { icon: Icon, label, hint, color }, first, onPress }: MoreRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, !first && styles.divider, pressed && styles.pressed]}>
      <View style={[styles.tile, { backgroundColor: `${color}24` }]}><Icon size={19} color={color} /></View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint} numberOfLines={1}>{hint}</Text>
      </View>
      <ChevronRightIcon size={18} color={c.faint} />
    </Pressable>
  );
}

export default MoreRow;
