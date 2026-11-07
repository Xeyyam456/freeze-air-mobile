import type { ReactNode } from "react";
import { Linking, Modal, Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import Button from "@shared/components/Button";
import { BriefcaseIcon, CalendarCheckIcon, CarIcon, CloseIcon, PhoneIcon, type Icon } from "@shared/icons";
import { experience, formatDate } from "@shared/utils/team";
import { c } from "@theme/colors";
import { styles } from "./PersonSheet.styles";
import type { PersonSheetProps } from "./PersonSheet.types";

function Cell({ icon: I, label, children }: { icon: Icon; label: string; children: ReactNode }) {
  return (
    <View style={styles.cell}>
      <View style={styles.cellHead}><I size={14} color={c.muted} /><Text style={styles.cellLabel}>{label}</Text></View>
      {children}
    </View>
  );
}

// Usta/rəhbər məlumat pəncərəsi (yalnız baxış): təcrübə, başlama tarixi, maşın, "Zəng et". X, fon və "geri" bağlayır
function PersonSheet({ person: p, subtitle, onClose }: PersonSheetProps) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          <Avatar name={p.full_name} photo={p.photo_url} size={88} />
          <Text style={styles.name}>{p.full_name}</Text>
          <Text style={styles.sub}>{subtitle}</Text>
          <View style={styles.cells}>
            <Cell icon={BriefcaseIcon} label="Təcrübə"><Text style={styles.cellValue}>{experience(p.start_date) ?? "—"}</Text></Cell>
            <Cell icon={CalendarCheckIcon} label="İşə başlayıb"><Text style={styles.cellValue}>{formatDate(p.start_date) ?? "—"}</Text></Cell>
            <Cell icon={PhoneIcon} label="Telefon"><Text style={styles.cellValue} selectable>{p.phone ?? "—"}</Text></Cell>
            <Cell icon={CarIcon} label="Maşın">
              {p.has_car
                ? <><Text style={styles.plate}>{p.car_plate ?? "Nömrə yazılmayıb"}</Text>{p.car_model ? <Text style={styles.cellLabel}>{p.car_model}</Text> : null}</>
                : <Text style={[styles.cellValue, { color: c.muted }]}>Yoxdur</Text>}
            </Cell>
          </View>
          {p.phone ? <Button title="Zəng et" variant="gradient" icon={PhoneIcon} style={styles.call} onPress={() => Linking.openURL(`tel:${p.phone}`)} /> : null}
        </View>
      </View>
    </Modal>
  );
}

export default PersonSheet;
