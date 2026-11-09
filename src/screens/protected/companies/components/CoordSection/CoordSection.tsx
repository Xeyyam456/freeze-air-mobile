import { Pressable, Text, TextInput, View } from "react-native";
import PlaceMap from "@shared/components/PlaceMap";
import usePlacePoint from "@screens/protected/companies/hooks/usePlacePoint";
import { CheckIcon, LocateFixedIcon } from "@shared/icons";
import { fmtDist, MAX_ACC } from "@shared/utils/helpers/location";
import { c } from "@theme/colors";
import { styles } from "./CoordSection.styles";
import type { CoordSectionProps } from "./CoordSection.types";

// 2) Koordinat: GPS ("Mövcud yerimi tap"), əl ilə yazmaq və ya xəritədə toxunub seçmək. Tapılan nöqtə xəritədə (nişanı toxunuşla köçür),
// GPS dəqiqliyi (≤ 100 m olmalıdır) və köhnə koordinatdan məsafə; "Bu koordinatı yaz" təsdiqlə
function CoordSection({ place, loc }: CoordSectionProps) {
  const { fix } = loc;
  const base = usePlacePoint(place).point;
  const shown = fix ?? base;
  return (
    <View style={styles.box}>
      <Text style={styles.label}>KOORDİNAT</Text>
      <Text style={styles.now}>
        {loc.has ? <>Hazırda: <Text style={styles.bold}>{(place.lat as number).toFixed(5)}, {(place.lng as number).toFixed(5)}</Text></> : "Koordinat yazılmayıb: xəritə ünvanla axtarır."}
      </Text>
      <Text style={styles.hint}>Həmin yerdəsənsə açıq yerdə dayan və «Mövcud yerimi tap» bas; yerdə deyilsənsə koordinatı yaz və ya xəritədə toxunub seç.</Text>
      <Pressable onPress={() => void loc.find()} disabled={loc.locating} style={[styles.find, loc.locating && styles.off]}>
        <LocateFixedIcon size={17} color={c.primary} /><Text style={styles.findText}>{loc.locating ? "Yer təyin olunur..." : fix && !fix.manual ? "Yenidən tap" : "Mövcud yerimi tap"}</Text>
      </Pressable>
      <TextInput value={loc.manual} onChangeText={loc.onManual} placeholder="40.40930, 49.86710" placeholderTextColor={c.faint} keyboardType="numbers-and-punctuation" autoCorrect={false}
        style={[styles.input, loc.manualBad && styles.bad]} />
      {loc.manualBad ? <Text style={styles.badText}>Format səhvdir: «enlik, uzunluq» kimi yaz (məs. 40.40930, 49.86710).</Text> : null}
      {shown ? <PlaceMap key={`${shown.lat},${shown.lng}`} lat={shown.lat} lng={shown.lng} height={200} onPick={loc.pick} /> : null}
      {fix ? (
        <View style={styles.info}>
          <Text style={styles.infoLine}>{fix.lat}, {fix.lng}</Text>
          {fix.manual ? <Text style={styles.dist}>Əl ilə / xəritədən seçilib: xəritədə doğru yer olduğunu yoxla.</Text>
            : <Text style={loc.goodFix ? styles.good : styles.warn}>GPS dəqiqliyi: ±{fix.acc} m {loc.goodFix ? "(yaxşıdır)" : `(pisdir, ≤ ${MAX_ACC} m olmalıdır: açıq yerdə gözlə və yenidən tap)`}</Text>}
          {loc.dist !== null ? <Text style={styles.dist}>Köhnə koordinatdan {fmtDist(loc.dist)} uzaqdır{loc.dist > 1000 ? ": əmin ol ki, düz mağazanın qarşısındasan" : ""}.</Text> : null}
        </View>
      ) : null}
      {fix ? (
        <Pressable disabled={!loc.goodFix || loc.busy !== null} onPress={() => loc.setConfirm(true)} style={[styles.write, (!loc.goodFix || loc.busy !== null) && styles.off]}>
          <CheckIcon size={17} color={c.white} /><Text style={styles.writeText}>Bu koordinatı yaz</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default CoordSection;
