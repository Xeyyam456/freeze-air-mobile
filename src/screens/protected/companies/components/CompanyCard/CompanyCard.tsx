import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import PlaceLogo from "@screens/protected/companies/components/PlaceLogo";
import StatBox from "@screens/protected/companies/components/StatBox";
import { ArrowUpRightIcon, MapPinIcon, PhoneIcon, UserIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./CompanyCard.styles";
import type { CompanyCardProps } from "./CompanyCard.types";

// Şirkət kartı (web "ClientCard" ilə eyni quruluş): gradient lövhə + ad + "N filial"/"Sabit məkan" + ok düyməsi; rəqəm qutuları
// (filial / bu ay iş; sabit məkanda ünvan / bu ay iş); altda əlaqə şəxsi və telefon. Basanda yumşaq kiçilir. memo: FlashList sətri
function CompanyCard({ company: co, works, onPress }: CompanyCardProps) {
  const k = useSharedValue(1);
  const scale = useAnimatedStyle(() => ({ transform: [{ scale: k.value }] }));
  const units = co.stores.length;
  const tone = works ? "#22c3e6" : undefined;
  return (
    <Animated.View style={scale}>
      <Pressable onPress={() => onPress(co)} onPressIn={() => { k.value = withTiming(0.98, { duration: 90 }); }} onPressOut={() => { k.value = withTiming(1, { duration: 160 }); }} style={styles.card} accessibilityLabel={co.name}>
        <View style={styles.head}>
          <PlaceLogo name={co.name} logo={co.logo_url} size={50} />
          <View style={styles.text}>
            <Text style={styles.name} numberOfLines={2}>{co.name}</Text>
            <Text style={styles.sub}>{units ? `${units} filial` : "Sabit məkan"}</Text>
          </View>
          <View style={styles.arrow}><ArrowUpRightIcon size={18} color={c.muted} /></View>
        </View>
        <View style={styles.stats}>
          {units ? <StatBox label="Filial" value={units} /> : (
            <View style={styles.addr}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}><MapPinIcon size={11} color={c.faint} /><Text style={styles.addrLabel}>ÜNVAN</Text></View>
              <Text style={styles.addrText} numberOfLines={2}>{co.address ?? "Yazılmayıb"}</Text>
            </View>
          )}
          <StatBox label="Bu ay iş" value={works} tone={tone} />
        </View>
        <View style={styles.foot}>
          <View style={styles.item}><UserIcon size={14} color={c.faint} /><Text style={styles.itemText} numberOfLines={1}>{co.contact_person ?? "Əlaqəli şəxs yoxdur"}</Text></View>
          <View style={styles.item}><PhoneIcon size={14} color={c.faint} /><Text style={styles.itemText} numberOfLines={1}>{co.phone ?? "Telefon yoxdur"}</Text></View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default memo(CompanyCard);
