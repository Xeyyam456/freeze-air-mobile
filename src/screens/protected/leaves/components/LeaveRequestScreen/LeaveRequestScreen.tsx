import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@shared/components/Button";
import ScreenHeader from "@shared/components/ScreenHeader";
import { SendIcon } from "@shared/icons";
import { leaveRange } from "@shared/utils/helpers/leaves";
import RangeCalendar from "@screens/protected/leaves/components/RangeCalendar";
import useLeaveForm from "@screens/protected/leaves/hooks/useLeaveForm";
import { c } from "@theme/colors";
import { styles } from "./LeaveRequestScreen.styles";

// İcazə istə (tab bar-ın üstündə tam ekran): tarix aralığı, iş günü sayı, səbəb; admin/rəhbərlik təsdiqləyir, cavab bildiriş kimi gəlir
function LeaveRequestScreen() {
  const insets = useSafeAreaInsets();
  const f = useLeaveForm();
  return (
    <View style={[styles.flex, { paddingTop: insets.top + 12 }]}>
      <View style={styles.pad}><ScreenHeader title="İcazə istə" sub="Bir gün və ya aralıq seç" /></View>
      <KeyboardAwareScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" bottomOffset={24}>
        <View style={styles.card}>
          <RangeCalendar month={f.month} today={f.today} from={f.from} to={f.to} onMonth={f.shift} onPick={f.pick} />
        </View>
        <View style={styles.summary}>
          <Text style={styles.range}>{f.from && f.end ? leaveRange({ date_from: f.from, date_to: f.end }) : "Tarix seç"}</Text>
          <Text style={styles.days}>{f.days} iş günü · bazar sayılmır</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Səbəb <Text style={styles.optional}>(istəyə görə)</Text></Text>
          <TextInput value={f.reason} onChangeText={f.setReason} multiline textAlignVertical="top" maxLength={300}
            style={styles.input} placeholderTextColor={c.faint} placeholder="Məs. ailə işi, xəstəlik" />
        </View>
      </KeyboardAwareScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Button title="Sorğunu göndər" variant="gradient" icon={SendIcon} disabled={f.days === 0} onPress={f.send} />
      </View>
    </View>
  );
}

export default LeaveRequestScreen;
