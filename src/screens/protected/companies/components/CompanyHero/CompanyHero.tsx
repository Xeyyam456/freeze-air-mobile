import { Linking, Pressable, Text, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import PlaceLogo from "@screens/protected/companies/components/PlaceLogo";
import StatBox from "@screens/protected/companies/components/StatBox";
import { LocateFixedIcon, MapIcon, MapPinIcon, NavigationIcon, PhoneIcon, UserIcon } from "@shared/icons";
import { hasLocation, shortDate, telUrl } from "@shared/utils/companies";
import { c } from "@theme/colors";
import { styles } from "./CompanyHero.styles";
import type { CompanyHeroProps } from "./CompanyHero.types";

// Vizit kartı (web "ClientHero"): tünd mavi, frost işıq; gradient lövhə, ad, əlaqə çipləri (əlaqə şəxsi, telefon — toxunanda zəng, sabit məkanda ünvan),
// rəqəm qutuları (filial, koordinatlı %, bu ay iş, son iş) və "Naviqator" düyməsi (Waze / Google Maps seçimi)
function CompanyHero({ company: co, units, coordPct, works, last, onNav, onMap, onFix }: CompanyHeroProps) {
  const fixed = units === 0;
  const can = hasLocation(co) || units > 0;
  return (
    <View style={styles.card}>
      <GradientBg colors={["#0c1b36", "#0a1630"]} glow="#22c3e6" radius={24} />
      <View style={styles.top}>
        <PlaceLogo name={co.name} logo={co.logo_url} size={64} />
        <View style={styles.text}><Text style={styles.name} numberOfLines={3}>{co.name}</Text></View>
      </View>
      <View style={styles.chips}>
        <View style={styles.pair}>
        <View style={[styles.chip, styles.grow]}><UserIcon size={14} color="rgba(255,255,255,0.5)" /><Text style={styles.chipText} numberOfLines={1}>{co.contact_person ?? "Əlaqəli şəxs yoxdur"}</Text></View>
        {co.phone ? (
          <Pressable onPress={() => void Linking.openURL(telUrl(co.phone as string))} style={[styles.chip, styles.fit]} accessibilityLabel={`Zəng et: ${co.phone}`}><PhoneIcon size={14} color="#22c3e6" /><Text style={[styles.chipText, styles.chipLink]}>{co.phone}</Text></Pressable>
        ) : <View style={[styles.chip, styles.fit]}><PhoneIcon size={14} color="rgba(255,255,255,0.5)" /><Text style={styles.chipText}>Telefon yoxdur</Text></View>}
        </View>
        {fixed ? <View style={[styles.chip, styles.chipFull]}><MapPinIcon size={14} color="rgba(255,255,255,0.5)" /><Text style={styles.chipText}>{co.address ?? "Ünvan yazılmayıb"}</Text></View> : null}
      </View>
      <View style={styles.grid}>
        {!fixed ? <View style={{ flexDirection: "row", gap: 8, width: "100%" }}><StatBox dark label="Filial" value={units} /><StatBox dark label="Koordinatlı" value={`${coordPct}%`} /></View> : null}
        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}><StatBox dark label="Bu ay iş" value={works} tone="#22c3e6" /><StatBox dark label="Son iş" value={last ? shortDate(last) : "—"} /></View>
      </View>
      <Pressable disabled={!can} onPress={onNav} style={[styles.nav, !can && styles.navOff]} accessibilityLabel="Naviqator">
        <NavigationIcon size={18} color={c.white} /><Text style={styles.navText}>Naviqator</Text>
      </Pressable>
      {fixed ? (
        <View style={styles.row2}>
          <Pressable disabled={!can} onPress={onMap} style={[styles.sec, !can && styles.navOff]}><MapIcon size={16} color={c.white} /><Text style={styles.secText}>Xəritədə göstər</Text></Pressable>
          <Pressable onPress={onFix} style={styles.sec}><LocateFixedIcon size={16} color={c.white} /><Text style={styles.secText}>Konumu düzəlt</Text></Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default CompanyHero;
