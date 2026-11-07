import { Camera, type CameraRef, Map, Marker } from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { LocateFixedIcon, MapPinIcon } from "@shared/icons";
import { MAP_STYLE } from "@shared/utils/location";
import { toast } from "@shared/utils/toast";
import { c } from "@theme/colors";
import { styles } from "./PlaceMap.styles";
import type { PlaceMapProps } from "./PlaceMap.types";

// Xəritə (MapLibre + OpenFreeMap vektor plitələri, API açarı yoxdur): yerin nişanı; interaktivdə toxunuşla nişan köçürülür (koordinat seçmək üçün).
// Sağ aşağıda iki düymə: "Mənim yerim" (icazə → cari yerə uçur, mavi nöqtə) və "Yerə qayıt". Atribusiya (OpenFreeMap / OpenStreetMap) xəritənin özündə qalır
function PlaceMap({ lat, lng, height = 220, zoom = 16, interactive = true, onPick }: PlaceMapProps) {
  const cam = useRef<CameraRef>(null);
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null);
  const [busy, setBusy] = useState(false);

  async function goMe() {
    setBusy(true);
    try {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (!perm.granted) throw new Error("icazə yoxdur");
      const p = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const at = { lat: p.coords.latitude, lng: p.coords.longitude };
      setMe(at);
      cam.current?.flyTo({ center: [at.lng, at.lat], zoom: 16, duration: 900 });
    } catch {
      toast.error("Yerin təyin olunmadı. Məkana icazə ver.");
    } finally { setBusy(false); }
  }

  return (
    <View style={[styles.box, { height }]}>
      <Map style={{ flex: 1 }} mapStyle={MAP_STYLE} dragPan={interactive} touchRotate={false} touchPitch={false} compass={false} logo={false}
        onPress={onPick ? (e) => { const [x, y] = e.nativeEvent.lngLat; onPick(y, x); } : undefined}>
        <Camera ref={cam} initialViewState={{ center: [lng, lat], zoom }} />
        <Marker id="place" lngLat={[lng, lat]} anchor="center"><View style={styles.pin}><MapPinIcon size={16} color={c.white} /></View></Marker>
        {me ? <Marker id="me" lngLat={[me.lng, me.lat]} anchor="center"><View style={styles.me} /></Marker> : null}
      </Map>
      {interactive ? (
        <View style={styles.tools}>
          <Pressable onPress={() => cam.current?.flyTo({ center: [lng, lat], zoom, duration: 700 })} style={styles.tool} accessibilityLabel="Yerə qayıt"><MapPinIcon size={18} color="#0e1726" /></Pressable>
          <Pressable onPress={() => void goMe()} disabled={busy} style={[styles.tool, busy && styles.toolOff]} accessibilityLabel="Mənim yerim"><LocateFixedIcon size={19} color="#0e1726" /></Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default PlaceMap;
