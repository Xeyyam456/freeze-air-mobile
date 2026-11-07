import { Linking, Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseIcon, NavigationIcon } from "@shared/icons";
import { mapsUrl, wazeUrl } from "@shared/utils/companies";
import { c } from "@theme/colors";
import { styles } from "./NavSheet.styles";
import type { NavSheetProps } from "./NavSheet.types";

// "Naviqator seç" (web NavButton ilə eyni): iki iri düymə — Waze ilə get, Google Maps ilə get. Koordinat varsa dəqiq nöqtə, yoxsa ünvan.
// Hər biri telefonda öz tətbiqini açır (yoxdursa brauzerdə). X, fon və "geri" bağlayır
function NavSheet({ place, onClose }: NavSheetProps) {
  const insets = useSafeAreaInsets();
  const go = (url: string) => { void Linking.openURL(url); onClose(); };
  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View>
              <Text style={styles.title}>Naviqator seç</Text>
              <Text style={styles.sub} numberOfLines={2}>{place.name}{place.address ? ` · ${place.address}` : ""}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          </View>
          <Pressable onPress={() => go(wazeUrl(place))} style={[styles.btn, styles.waze]}><NavigationIcon size={20} color="#06192b" /><Text style={styles.wazeText}>Waze ilə get</Text></Pressable>
          <Pressable onPress={() => go(mapsUrl(place))} style={[styles.btn, styles.google]}><NavigationIcon size={20} color={c.white} /><Text style={styles.googleText}>Google Maps ilə get</Text></Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default NavSheet;
