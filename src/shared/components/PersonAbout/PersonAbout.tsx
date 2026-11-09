import type { ReactNode } from "react";
import { Linking, Text, View } from "react-native";
import Button from "@shared/components/Button";
import { BriefcaseIcon, CalendarCheckIcon, CarIcon, PhoneIcon, type Icon } from "@shared/icons";
import { experience, formatDate } from "@shared/utils/helpers/team";
import { c } from "@theme/colors";
import type { Person } from "@typings/team";
import { styles } from "./PersonAbout.styles";

function Row({ icon: I, color, label, first, children }: { icon: Icon; color: string; label: string; first?: boolean; children: ReactNode }) {
  return (
    <View style={[styles.row, !first && styles.line]}>
      <View style={[styles.tile, { backgroundColor: `${color}24` }]}><I size={18} color={color} /></View>
      <View style={styles.rowText}><Text style={styles.rowLabel}>{label.toLocaleUpperCase("az")}</Text>{children}</View>
    </View>
  );
}

// "Haqqında": təcrübə, işə başlama tarixi, telefon, maşın + "Zəng et"
function PersonAbout({ person: p }: { person: Person }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.list}>
        <Row first icon={BriefcaseIcon} color={c.primary} label="Təcrübə"><Text style={styles.value}>{experience(p.start_date) ?? "—"}</Text></Row>
        <Row icon={CalendarCheckIcon} color={c.violet} label="İşə başlayıb"><Text style={styles.value}>{formatDate(p.start_date) ?? "—"}</Text></Row>
        <Row icon={PhoneIcon} color={c.ok} label="Telefon"><Text style={styles.value} selectable>{p.phone ?? "—"}</Text></Row>
        <Row icon={CarIcon} color={c.orange} label="Maşın">
          {p.has_car
            ? <View style={styles.plateRow}><Text style={styles.plate}>{p.car_plate ?? "Nömrə yazılmayıb"}</Text>{p.car_model ? <Text style={styles.model}>{p.car_model}</Text> : null}</View>
            : <Text style={[styles.value, { color: c.muted }]}>Yoxdur</Text>}
        </Row>
      </View>
      {p.phone ? <Button title="Zəng et" variant="gradient" icon={PhoneIcon} onPress={() => Linking.openURL(`tel:${p.phone}`)} /> : null}
    </View>
  );
}

export default PersonAbout;
