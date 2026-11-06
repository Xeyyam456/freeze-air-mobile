import { LogOutIcon } from "@shared/icons";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { signOut } from "@shared/services/auth.service";
import { dayLabel } from "@shared/utils/time";
import { c } from "@theme/colors";
import { styles } from "./PanelHeader.styles";
import type { PanelHeaderProps } from "./PanelHeader.types";

// Başlıq: kiçik tarix sətri, iri salam, sağda şəkil (halqa ilə) və çıxış
function PanelHeader({ name, photo, day }: PanelHeaderProps) {
  const first = name.split(/\s+/)[1] ?? name; // "Əlizadə Xəyyam" → "Xəyyam"
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.date}>{dayLabel(day).toUpperCase()}</Text>
        <Text style={styles.hello} numberOfLines={1}>Salam, {first}</Text>
      </View>
      <Pressable onPress={signOut} hitSlop={10} style={({ pressed }) => [styles.icon, pressed && styles.pressed]}>
        <LogOutIcon size={18} color={c.muted} />
      </Pressable>
      <View style={styles.ring}><Avatar name={name} photo={photo} size={42} /></View>
    </View>
  );
}

export default PanelHeader;
