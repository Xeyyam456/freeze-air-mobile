import { Text, View } from "react-native";
import { UsersIcon } from "@shared/icons";
import { partnerText } from "@shared/utils/helpers/team";
import { c } from "@theme/colors";
import { styles } from "./PartnerLines.styles";

// "Birlikdə" işləyən ustalar (eyni tapşırıq qrupu): 1 nəfər → "Fərhadla birlikdə"; 2+ nəfər → "Birlikdə:" altında hər biri ayrı sətirdə (ad və soyad)
function PartnerLines({ names }: { names: string[] }) {
  if (!names.length) return null;
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <UsersIcon size={12} color={c.primary} />
        <Text style={styles.text} numberOfLines={names.length === 1 ? 1 : undefined}>{names.length === 1 ? partnerText(names) : "Birlikdə:"}</Text>
      </View>
      {names.length > 1 ? names.map((n) => <Text key={n} style={styles.name} numberOfLines={1}>{n}</Text>) : null}
    </View>
  );
}

export default PartnerLines;
