import { Image } from "expo-image";
import { Text, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { initial } from "@shared/utils/helpers/companies";
import { c } from "@theme/colors";
import { styles } from "./PlaceLogo.styles";
import type { PlaceLogoProps } from "./PlaceLogo.types";

// Şirkətin loqosu (varsa, ağ fonda, disk keşi) və ya web-dəki kimi gradient (frost → mavi) lövhədə baş hərf
function PlaceLogo({ name, logo, size = 52 }: PlaceLogoProps) {
  const r = size * 0.3;
  const box = { width: size, height: size, borderRadius: r };
  if (logo) return <Image source={logo} style={[styles.box, box, { backgroundColor: "#fff" }]} contentFit="contain" cachePolicy="disk" transition={150} />;
  return (
    <View style={[styles.box, box]}>
      <GradientBg colors={["#22c3e6", c.primary]} radius={r} />
      <Text style={[styles.letter, { fontSize: size * 0.42 }]}>{initial(name)}</Text>
    </View>
  );
}

export default PlaceLogo;
