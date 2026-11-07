import { Pressable, ScrollView, Text, View } from "react-native";
import { toneOf } from "@shared/config/codeTones";
import { styles } from "./RecentCodes.styles";
import type { RecentCodesProps } from "./RecentCodes.types";

// Son baxılan kodlar: üfüqi çiplər (kod + model), toxunuş birbaşa izahı açır. Axtarış yazılanda gizlənir
function RecentCodes({ codes, names, onOpen }: RecentCodesProps) {
  if (!codes.length) return null;
  return (
    <View>
      <Text style={styles.kicker}>SON BAXILANLAR</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} keyboardShouldPersistTaps="handled">
        {codes.map((cd) => (
          <Pressable key={cd.id} onPress={() => onOpen(cd)} style={styles.chip} accessibilityLabel={`Kod ${cd.code}`}>
            <View style={[styles.plate, { backgroundColor: `${toneOf(cd.code[0] ?? "")}26` }]}><Text style={[styles.code, { color: toneOf(cd.code[0] ?? "") }]}>{cd.code}</Text></View>
            <Text style={styles.model}>{(names.get(cd.model_id) ?? "").replace("Daikin ", "")}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export default RecentCodes;
