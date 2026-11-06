import { LogOut } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import { signOut } from "@shared/services/auth.service";
import { dayLabel } from "@shared/utils/time";
import { c } from "@theme/colors";
import { styles } from "./PanelHeader.styles";
import type { PanelHeaderProps } from "./PanelHeader.types";

// Salamlama: şəkil, ad, bugünkü tarix, çıxış düyməsi
function PanelHeader({ name, photo, day }: PanelHeaderProps) {
  const first = name.split(/\s+/)[1] ?? name; // "Əlizadə Xəyyam" → "Xəyyam"
  return (
    <View style={styles.row}>
      <Avatar name={name} photo={photo} size={46} />
      <View style={styles.text}>
        <Text style={styles.hello} numberOfLines={1}>Salam, {first}</Text>
        <Text style={styles.date}>{dayLabel(day)}</Text>
      </View>
      <Pressable onPress={signOut} hitSlop={10} style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
        <LogOut size={19} color={c.muted} />
      </Pressable>
    </View>
  );
}

export default PanelHeader;
