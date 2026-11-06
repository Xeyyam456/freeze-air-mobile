import { Text, View } from "react-native";
import { c } from "@theme/colors";
import { styles } from "./Card.styles";
import type { CardProps } from "./Card.types";

// Kart: başlıq (ikon plitəsi + yazı + sağda əlavə), içində məzmun
function Card({ title, icon: Icon, right, children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {title && (
        <View style={styles.head}>
          {Icon && <View style={styles.tile}><Icon size={18} color={c.primary} /></View>}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.right}>{right}</View>
        </View>
      )}
      {children}
    </View>
  );
}

export default Card;
