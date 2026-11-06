import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { LogOutIcon } from "@shared/icons";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { signOut } from "@shared/services/auth.service";
import { dayLabel } from "@shared/utils/time";
import { c } from "@theme/colors";
import type { PanelStackParamList } from "@typings/navigation";
import { styles } from "./PanelHeader.styles";
import type { PanelHeaderProps } from "./PanelHeader.types";

// Başlıq: kiçik tarix sətri, iri salam, sağda çıxış və şəkil (halqa ilə; toxunanda Profil — şəkli dəyiş)
function PanelHeader({ name, photo, day }: PanelHeaderProps) {
  const nav = useNavigation<NavigationProp<PanelStackParamList>>();
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
      <Pressable onPress={() => nav.navigate("Profile")} hitSlop={6} accessibilityLabel="Profil"
        style={({ pressed }) => [styles.ring, pressed && styles.pressed]}>
        <Avatar name={name} photo={photo} size={42} />
      </Pressable>
    </View>
  );
}

export default PanelHeader;
