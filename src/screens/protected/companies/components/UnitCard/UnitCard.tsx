import { memo } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { LocateFixedIcon, MapIcon, MapPinIcon, NavigationIcon, PhoneIcon } from "@shared/icons";
import { hasCoords, hasLocation, telUrl } from "@shared/utils/helpers/companies";
import { c } from "@theme/colors";
import { styles } from "./UnitCard.styles";
import type { UnitCardProps } from "./UnitCard.types";

// Filial/mağaza kartı (web "StoreCard"): kod, koordinat vəziyyəti (yaşıl/kəhrəba nöqtə), ad, ünvan, telefon (toxunanda zəng) və altda üç düymə: Xəritə, Konum (düzəlt), Naviqator (Waze / Google Maps). memo
function UnitCard({ unit: u, onNav, onMap, onFix }: UnitCardProps) {
  const has = hasCoords(u);
  const can = hasLocation(u);
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.code}><Text style={styles.codeText}>{u.code}</Text></View>
        <View style={styles.status}>
          <View style={[styles.dot, { backgroundColor: has ? c.ok : "#f59e0b" }]} />
          <Text style={[styles.statusText, { color: has ? c.ok : "#f59e0b" }]}>{has ? "Koordinat var" : "Koordinat yoxdur"}</Text>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>{u.name}</Text>
      <View style={styles.line}><MapPinIcon size={14} color={c.faint} /><Text style={styles.lineText} numberOfLines={2}>{u.address ?? "Ünvan yazılmayıb"}</Text></View>
      <View style={styles.line}>
        <PhoneIcon size={14} color={c.faint} />
        {u.phone ? <Pressable onPress={() => void Linking.openURL(telUrl(u.phone as string))}><Text style={[styles.lineText, styles.link]}>{u.phone}</Text></Pressable> : <Text style={styles.lineText}>Telefon yoxdur</Text>}
      </View>
      <View style={styles.foot}>
        <Pressable disabled={!can} onPress={() => onMap(u)} style={[styles.nav, styles.btn, !can && styles.navOff]} accessibilityLabel="Xəritədə göstər"><MapIcon size={15} color={c.primary} /><Text style={styles.navText}>Xəritə</Text></Pressable>
        <Pressable onPress={() => onFix(u)} style={[styles.nav, styles.btn]} accessibilityLabel="Konumu düzəlt"><LocateFixedIcon size={15} color={c.primary} /><Text style={styles.navText}>Konum</Text></Pressable>
        <Pressable disabled={!can} onPress={() => onNav(u)} style={[styles.nav, styles.btn, !can && styles.navOff]} accessibilityLabel="Naviqator"><NavigationIcon size={15} color={c.primary} /><Text style={styles.navText}>Naviqator</Text></Pressable>
      </View>
    </View>
  );
}

export default memo(UnitCard);
