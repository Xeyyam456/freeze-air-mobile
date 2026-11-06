import { Image } from "expo-image";
import { Text, View } from "react-native";
import { styles } from "./Avatar.styles";
import type { AvatarProps } from "./Avatar.types";

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// Profil şəkli (expo-image: disk keşi) və ya baş hərflər
function Avatar({ name, photo, size = 36 }: AvatarProps) {
  const box = { width: size, height: size, borderRadius: size / 2 };
  if (photo) return <Image source={photo} style={[box, styles.ring]} cachePolicy="disk" transition={150} />;
  return (
    <View style={[box, styles.ring, styles.fallback]}>
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{initials(name)}</Text>
    </View>
  );
}

export default Avatar;
