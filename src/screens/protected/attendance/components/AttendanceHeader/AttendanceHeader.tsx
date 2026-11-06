import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { ChevronLeftIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./AttendanceHeader.styles";
import type { AttendanceHeaderProps } from "./AttendanceHeader.types";

// Ekran başlığı: geri düyməsi (telefonun "geri"si də işləyir), başlıq, alt yazı
function AttendanceHeader({ title, sub }: AttendanceHeaderProps) {
  const nav = useNavigation();
  return (
    <View style={styles.row}>
      <Pressable onPress={nav.goBack} hitSlop={10} style={styles.back} accessibilityLabel="Geri">
        <ChevronLeftIcon size={20} color={c.ink} />
      </Pressable>
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {sub ? <Text style={styles.sub} numberOfLines={1}>{sub}</Text> : null}
      </View>
    </View>
  );
}

export default AttendanceHeader;
