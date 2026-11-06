import * as ImagePicker from "expo-image-picker";
import { toast } from "@shared/utils/toast";

export type PickMedia = "images" | "videos";
type PickOptions = { multiple?: boolean; square?: boolean };

// Kamera (icazə soruşulur) və ya qalereya (Android 13+ sistem seçicisi, icazə lazım deyil).
// square: telefonun öz kəsmə ekranı (profil şəkli 1:1). Ləğv edilsə boş siyahı
export async function pickAssets(source: "camera" | "gallery", media: PickMedia, { multiple = false, square = false }: PickOptions = {}) {
  const edit = square ? { allowsEditing: true, aspect: [1, 1] as [number, number] } : {};
  if (source === "camera") {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      toast.error("Kameraya icazə verilməyib. Telefon ayarlarından icazə ver.");
      return [];
    }
    const r = await ImagePicker.launchCameraAsync({ mediaTypes: [media], quality: 1, ...edit });
    return r.canceled ? [] : r.assets;
  }
  const r = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [media], quality: 1, allowsMultipleSelection: multiple, selectionLimit: multiple ? 10 : 1, ...edit,
  });
  return r.canceled ? [] : r.assets;
}
