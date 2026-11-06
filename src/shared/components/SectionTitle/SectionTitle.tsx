import { Text, View } from "react-native";
import { c } from "@theme/colors";
import { styles } from "./SectionTitle.styles";
import type { SectionTitleProps } from "./SectionTitle.types";

// Bölmə başlığı: ikon + böyük hərflə başlıq + sağda say/əlavə
function SectionTitle({ title, icon: Icon, count, right }: SectionTitleProps) {
  return (
    <View style={styles.row}>
      {Icon && <Icon size={15} color={c.muted} />}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>
        {count !== undefined && <Text style={styles.count}>{count}</Text>}
        {right}
      </View>
    </View>
  );
}

export default SectionTitle;
