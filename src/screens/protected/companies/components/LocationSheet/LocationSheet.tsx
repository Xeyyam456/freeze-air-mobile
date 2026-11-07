import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ConfirmModal from "@shared/components/ConfirmModal";
import useKeyboardHeight from "@shared/hooks/useKeyboardHeight";
import AddressSection from "@screens/protected/companies/components/AddressSection";
import CoordSection from "@screens/protected/companies/components/CoordSection";
import usePlaceLocation from "@screens/protected/companies/hooks/usePlaceLocation";
import { CloseIcon, LocateFixedIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./LocationSheet.styles";
import type { LocationSheetProps } from "./LocationSheet.types";

// "Konumu düzəlt" (web PlaceLocationButton): ünvan (mağazada olmasan da) + koordinat (GPS "Mövcud yerimi tap", əl ilə, xəritəyə toxunmaqla);
// yazmazdan əvvəl təsdiq; hər dəyişiklik bazada jurnala düşür (0087). X, fon və "geri" bağlayır
function LocationSheet({ place, onClose }: LocationSheetProps) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const kb = useKeyboardHeight();
  const loc = usePlaceLocation(place);
  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <View style={[styles.sheet, { maxHeight: height * 0.92 - (kb ? kb : 0), marginBottom: kb ? kb + insets.bottom : 0 }]}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={styles.text}>
              <Text style={styles.title}>Konumu düzəlt</Text>
              <Text style={styles.sub} numberOfLines={1}>{place.code ? `${place.code} · ` : ""}{place.name}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 20 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <AddressSection loc={loc} />
            <CoordSection place={place} loc={loc} />
          </ScrollView>
        </View>
      </View>
      {loc.confirm && loc.fix ? (
        <ConfirmModal title={loc.has ? "Koordinat dəyişsin?" : "Koordinat yazılsın?"} icon={LocateFixedIcon} confirmTitle="Yaz"
          text={`${loc.fix.lat}, ${loc.fix.lng}${loc.dist !== null ? ` (köhnədən ${Math.round(loc.dist)} m)` : ""}`}
          onConfirm={() => void loc.save("coord")} onClose={() => loc.setConfirm(false)} />
      ) : null}
    </Modal>
  );
}

export default LocationSheet;
