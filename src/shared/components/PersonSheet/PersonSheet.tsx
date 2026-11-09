import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import GradientBg from "@shared/components/GradientBg";
import PersonAbout from "@shared/components/PersonAbout";
import PersonWork from "@shared/components/PersonWork";
import useEmployeeWork from "@shared/hooks/useEmployeeWork";
import { CloseIcon } from "@shared/icons";
import { partnerText } from "@shared/utils/helpers/team";
import { todayBaku } from "@shared/utils/helpers/time";
import { c, gradients, space } from "@theme/colors";
import type { PersonStatus } from "@typings/team";
import { styles } from "./PersonSheet.styles";
import type { PersonSheetProps } from "./PersonSheet.types";

const TONE: Record<PersonStatus["kind"], string> = { in: c.ok, done: c.primary, leave: c.violet, none: c.faint };
type Tab = "day" | "month" | "about";

// Usta/rəhbər məlumat pəncərəsi (yalnız baxış). Ustada üç tab: "Bu gün" / "Bu ay" (harada, nə iş gördü) və "Haqqında"; rəhbərdə yalnız "Haqqında".
// Hündürlük SABİTDİR ("Haqqında" tabının ölçüsü qədər): tab dəyişəndə və ya iş sayı dəyişəndə pəncərə uzanıb-qısalmır, məzmun içində sürüşür.
// X, fon və telefonun "geri"si bağlayır
function PersonSheet({ person: p, subtitle, status, partners, stats, onClose }: PersonSheetProps) {
  const { height } = useWindowDimensions();
  const [about, setAbout] = useState(0); // "Haqqında" məzmununun ölçülmüş hündürlüyü = məzmun sahəsinin sabit hündürlüyü
  const [tab, setTab] = useState<Tab>(stats ? "day" : "about");
  // Say tablarda işin özündən hesablanır (siyahı keşi köhnə ola bilər); yüklənənə qədər siyahıdakı say
  const work = useEmployeeWork(p.id, !!stats).data;
  const today = todayBaku();
  const dayCount = work ? work.filter((e) => e.work_date === today).length : stats?.[0].value;
  const monthCount = work ? work.length : stats?.[1].value;
  const tone = status ? TONE[status.kind] : c.glassBorder;
  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "day", label: "Bu gün", count: dayCount },
    { key: "month", label: "Bu ay", count: monthCount },
    { key: "about", label: "Haqqında" },
  ];
  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={[styles.card, { maxHeight: height * 0.92 }]}>
          <View style={styles.banner}>
            <GradientBg colors={gradients.hero} glow={c.primary} radius={0} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.ink} /></Pressable>
          </View>
          <View style={styles.head}>
            <View style={[styles.ring, { borderColor: tone }]}><Avatar name={p.full_name} photo={p.photo_url} size={88} /></View>
            <Text style={styles.name}>{p.full_name}</Text>
            <Text style={styles.chip}>{subtitle}</Text>
            {status ? (
              <View style={styles.statusRow}>
                <View style={[styles.dot, { backgroundColor: tone }]} />
                <Text style={[styles.status, { color: status.kind === "none" ? c.muted : tone }]}>{status.text}</Text>
              </View>
            ) : null}
            {stats ? <Text style={styles.partner} numberOfLines={2}>{partners?.length ? partnerText(partners) : " "}</Text> : null}
            {stats ? (
              <View style={styles.tabs}>
                {tabs.map((t) => (
                  <Pressable key={t.key} onPress={() => setTab(t.key)} style={[styles.tab, tab === t.key && styles.tabOn]}>
                    <Text style={[styles.tabText, tab === t.key && styles.tabTextOn]}>{t.label}</Text>
                    {t.count !== undefined && <Text style={[styles.count, tab === t.key && styles.countOn]}>{t.count}</Text>}
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
          <View style={{ height: (about || 300) + space.lg }}>
            <ScrollView key={tab} contentContainerStyle={[styles.content, tab === "about" && styles.contentAbout]} showsVerticalScrollIndicator={false}>
              {tab === "about" ? <PersonAbout person={p} /> : <PersonWork employeeId={p.id} period={tab} />}
            </ScrollView>
            {/* Görünməz ölçmə: "Haqqında" nə qədər yer tutursa, pəncərə həmişə o qədər olur */}
            <View style={styles.measure} pointerEvents="none" onLayout={(e) => setAbout(Math.round(e.nativeEvent.layout.height))}>
              <PersonAbout person={p} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default PersonSheet;
