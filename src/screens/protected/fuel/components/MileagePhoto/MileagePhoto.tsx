import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { View } from "react-native";
import { CameraIcon } from "@shared/icons";
import { mileagePhotoUrl } from "@shared/services/fuel.service";
import { c } from "@theme/colors";
import { styles } from "./MileagePhoto.styles";
import type { MileagePhotoProps } from "./MileagePhoto.types";

// Spidometr şəkli: telefondakı yerli fayl (optimistik, hələ yüklənir) və ya qapalı bucket-dən imzalı link (50 dəq keşdə)
function MileagePhoto({ path }: MileagePhotoProps) {
  const local = !!path && /^(file|content):/.test(path);
  const signed = useQuery({
    queryKey: ["mileage-photo", path],
    queryFn: () => mileagePhotoUrl(path!),
    enabled: !!path && !local,
    staleTime: 50 * 60_000,
  });
  const uri = local ? path : signed.data;
  return (
    <View style={styles.box}>
      {uri ? <Image source={{ uri }} style={styles.img} contentFit="cover" transition={150} /> : <CameraIcon size={18} color={c.faint} />}
    </View>
  );
}

export default MileagePhoto;
