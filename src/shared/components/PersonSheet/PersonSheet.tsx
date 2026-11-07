import type { ReactNode } from "react";
import { Linking, Modal, Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import Button from "@shared/components/Button";
import GradientBg from "@shared/components/GradientBg";
import { BriefcaseIcon, CalendarCheckIcon, CarIcon, CloseIcon, PhoneIcon, type Icon } from "@shared/icons";
import { experience, formatDate } from "@shared/utils/team";
import { c, gradients } from "@theme/colors";
import type { PersonStatus } from "@typings/team";
import { styles } from "./PersonSheet.styles";
import type { PersonSheetProps } from "./PersonSheet.types";

const TONE: Record<PersonStatus["kind"], string> = { in: c.ok, done: c.primary, leave: c.violet, none: c.faint };

function Row({ icon: I, color, label, first, children }: { icon: Icon; color: string; label: string; first?: boolean; children: ReactNode }) {
  return (
    <View style={[styles.row, !first && styles.line]}>
      <View style={[styles.tile, { backgroundColor: `${color}24` }]}><I size={18} color={color} /></View>
      <View style={styles.rowText}><Text style={styles.rowLabel}>{label.toLocaleUpperCase("az")}</Text>{children}</View>
    </View>
  );
}

// Usta/rəhbər məlumat pəncərəsi (yalnız baxış): qradiyent başlıq, vəziyyət halqalı şəkil, bu gün/ay sayları, məlumat sətirləri, "Zəng et".
// X, fon və telefonun "geri"si bağlayır
function PersonSheet({ person: p, subtitle, status, stats, onClose }: PersonSheetProps) {
  const tone = status ? TONE[status.kind] : c.glassBorder;
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <View style={styles.banner}>
            <GradientBg colors={gradients.hero} glow={c.primary} radius={0} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.ink} /></Pressable>
          </View>
          <View style={styles.body}>
            <View style={[styles.ring, { borderColor: tone }]}><Avatar name={p.full_name} photo={p.photo_url} size={88} /></View>
            <Text style={styles.name}>{p.full_name}</Text>
            <Text style={styles.chip}>{subtitle}</Text>
            {status ? (
              <View style={styles.statusRow}>
                <View style={[styles.dot, { backgroundColor: tone }]} />
                <Text style={[styles.status, { color: status.kind === "none" ? c.muted : tone }]}>{status.text}</Text>
              </View>
            ) : null}
            {stats ? (
              <View style={styles.stats}>
                {stats.map((s, i) => (
                  <View key={s.label} style={styles.stat}>
                    <Text style={[styles.statValue, { color: s.value ? (i ? c.primary : c.ok) : c.faint }]}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            <View style={styles.list}>
              <Row first icon={BriefcaseIcon} color={c.primary} label="Təcrübə"><Text style={styles.rowValue}>{experience(p.start_date) ?? "—"}</Text></Row>
              <Row icon={CalendarCheckIcon} color={c.violet} label="İşə başlayıb"><Text style={styles.rowValue}>{formatDate(p.start_date) ?? "—"}</Text></Row>
              <Row icon={PhoneIcon} color={c.ok} label="Telefon"><Text style={styles.rowValue} selectable>{p.phone ?? "—"}</Text></Row>
              <Row icon={CarIcon} color={c.orange} label="Maşın">
                {p.has_car
                  ? <View style={styles.plateRow}><Text style={styles.plate}>{p.car_plate ?? "Nömrə yazılmayıb"}</Text>{p.car_model ? <Text style={styles.model}>{p.car_model}</Text> : null}</View>
                  : <Text style={[styles.rowValue, { color: c.muted }]}>Yoxdur</Text>}
              </Row>
            </View>
            {p.phone ? <Button title="Zəng et" variant="gradient" icon={PhoneIcon} style={styles.call} onPress={() => Linking.openURL(`tel:${p.phone}`)} /> : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default PersonSheet;
