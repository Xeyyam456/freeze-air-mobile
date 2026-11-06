import { Text, View } from "react-native";
import { MegaphoneIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./AnnouncementsEmpty.styles";

// Hələ elan yoxdur
function AnnouncementsEmpty() {
  return (
    <View style={styles.card}>
      <View style={styles.icon}><MegaphoneIcon size={22} color={c.primary} /></View>
      <Text style={styles.title}>Hələ elan yoxdur</Text>
      <Text style={styles.text}>Rəhbərlik elan göndərəndə burada və telefonunda bildiriş kimi görünəcək.</Text>
    </View>
  );
}

export default AnnouncementsEmpty;
