import { ActivityIndicator, Text, View } from "react-native";
import PlaceMap from "@shared/components/PlaceMap";
import usePlacePoint from "@screens/protected/companies/hooks/usePlacePoint";
import { MapPinIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./PlaceMapCard.styles";
import type { PlaceMapCardProps } from "./PlaceMapCard.types";

// Filialsız (sabit məkanlı) şirkət: yer böyük xəritədə (web LocationView). Naviqator və "Konumu düzəlt" yalnız vizit kartındadır.
// Koordinat yoxdursa ünvan Nominatim ilə təxmini nöqtəyə çevrilir
function PlaceMapCard({ place }: PlaceMapCardProps) {
  const p = usePlacePoint(place);
  return (
    <View style={styles.box}>
      {p.point ? <PlaceMap lat={p.point.lat} lng={p.point.lng} height={300} />
        : <View style={styles.empty}>{p.loading ? <ActivityIndicator color={c.muted} /> : <><MapPinIcon size={24} color={c.faint} /><Text style={styles.emptyText}>Ünvan yazılmayıb</Text></>}</View>}
    </View>
  );
}

export default PlaceMapCard;
