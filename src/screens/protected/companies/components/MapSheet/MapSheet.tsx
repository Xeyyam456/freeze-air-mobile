import { ActivityIndicator, Modal, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PlaceMap from "@shared/components/PlaceMap";
import usePlacePoint from "@screens/protected/companies/hooks/usePlacePoint";
import { CloseIcon, MapPinIcon, NavigationIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./MapSheet.styles";
import type { MapSheetProps } from "./MapSheet.types";

// "Xəritədə göstər" (web MapButton): yerin xəritəsi (MapLibre + OpenFreeMap). Koordinat yoxdursa ünvan Nominatim ilə nöqtəyə çevrilir (təxmini);
// altda "Naviqator" (Waze / Google Maps). X, fon və "geri" bağlayır
function MapSheet({ place, onNav, onClose }: MapSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const p = usePlacePoint(place);
  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 14 }]}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={styles.text}>
              <Text style={styles.title} numberOfLines={2}>{place.code ? `${place.code} · ` : ""}{place.name}</Text>
              <Text style={styles.addr} numberOfLines={2}>{place.address ?? "Ünvan yazılmayıb"}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          <View style={styles.body}>
            {p.point ? <PlaceMap lat={p.point.lat} lng={p.point.lng} height={Math.min(height * 0.5, 420)} />
              : p.loading ? <View style={styles.none}><ActivityIndicator color={c.muted} /></View>
              : <View style={styles.none}><MapPinIcon size={26} color={c.faint} /><Text style={styles.noneText}>Nə koordinat, nə də tapılan ünvan var. "Konumu düzəlt" ilə yaz.</Text></View>}
          </View>
          {p.byAddress ? <Text style={styles.note}>Nöqtə ünvana görə təxmini tapılıb. Dəqiq yer üçün koordinat yaz.</Text> : null}
          <Pressable onPress={onNav} style={styles.nav}><NavigationIcon size={18} color={c.white} /><Text style={styles.navText}>Naviqator</Text></Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default MapSheet;
