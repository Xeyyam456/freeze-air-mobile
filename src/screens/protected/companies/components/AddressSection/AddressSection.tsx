import { Pressable, Text, TextInput, View } from "react-native";
import { CheckIcon, MapPinIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./AddressSection.styles";
import type { AddressSectionProps } from "./AddressSection.types";

// 1) Ünvan: mağazada olmasan da dəyişmək olar; "Koordinatdan götür" — seçilmiş/mövcud koordinatın ünvanını Nominatim ilə gətirir (redaktə edib saxla)
function AddressSection({ loc }: AddressSectionProps) {
  const off = !loc.addrChanged || loc.busy !== null;
  return (
    <View style={styles.box}>
      <Text style={styles.label}>DƏQİQ ÜNVAN</Text>
      <TextInput value={loc.address} onChangeText={loc.setAddress} multiline maxLength={300} style={styles.input} placeholder="Məs. Bakı, Nəsimi r., Neftçilər pr. 120" placeholderTextColor={c.faint} />
      <Text style={styles.hint}>Mağazada olmasan belə, düzgün ünvanı bilirsənsə yaza bilərsən.</Text>
      <View style={styles.row}>
        <Pressable disabled={loc.busy !== null} onPress={() => void loc.takeAddress()} style={[styles.btn, styles.btnGlass, loc.busy !== null && styles.off]}>
          <MapPinIcon size={15} color={c.ink} /><Text style={[styles.text, styles.textGlass]}>{loc.busy === "geo" ? "..." : "Koordinatdan götür"}</Text>
        </Pressable>
        <Pressable disabled={off} onPress={() => void loc.save("addr")} style={[styles.btn, off && styles.off]}>
          <CheckIcon size={15} color={c.primary} /><Text style={styles.text}>{loc.busy === "addr" ? "..." : "Yadda saxla"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AddressSection;
