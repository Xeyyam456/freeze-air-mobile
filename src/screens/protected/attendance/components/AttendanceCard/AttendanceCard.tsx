import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Avatar from "@shared/components/Avatar";
import SessionList from "@screens/protected/panel/components/SessionList";
import { todayBadge } from "@shared/utils/helpers/attendanceView";
import { c } from "@theme/colors";
import { TONE, styles } from "./AttendanceCard.styles";
import type { AttendanceCardProps } from "./AttendanceCard.types";

// Usta kartı (web EmployeeCard): ad, ixtisas · iş günü, 4 göstərici, bu günün nişanı (+ bir neçə seans).
// Toxunanda ustanın təqvimi açılır. memo: FlashList sətri
function AttendanceCard({ employee: e, summary: a, isMe, isCurrent, onOpen }: AttendanceCardProps) {
  const cells = [
    { label: "İşdə", value: a?.present, color: c.ok },
    { label: "İcazə", value: a?.leaveTimes ? a.leave : 0, color: c.violet },
    { label: "İcazəsiz", value: a?.absent, color: c.danger },
    { label: "Bazar", value: a?.extra, color: c.ink },
  ];
  const badge = a && isCurrent ? todayBadge(a) : null;
  const sessions = a?.today.presence?.sessions ?? [];

  return (
    <Pressable onPress={() => onOpen(e)} style={({ pressed }) => [styles.card, isMe && styles.me, pressed && styles.pressed]}>
      <View style={styles.head}>
        <Avatar name={e.full_name} photo={e.photo_url} size={42} />
        <View style={styles.who}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{e.full_name}</Text>
            {isMe && <Text style={styles.meTag}>Sən</Text>}
          </View>
          <Text style={styles.sub} numberOfLines={1}>
            {e.specialty ?? ""}{a ? `${e.specialty ? " · " : ""}${a.workdays} iş günü` : ""}
          </Text>
        </View>
      </View>
      <View style={styles.cells}>
        {cells.map((x) => (
          <View key={x.label} style={styles.cell}>
            <Text style={styles.cellLabel}>{x.label}</Text>
            <Text style={[styles.cellValue, { color: x.value ? x.color : c.faint }]}>{a ? x.value || "—" : "…"}</Text>
          </View>
        ))}
      </View>
      {badge && (
        <View style={styles.today}>
          <Text style={[styles.badge, TONE[badge.tone]]}>{badge.text}</Text>
          {sessions.length > 1 && <SessionList sessions={sessions} />}
        </View>
      )}
    </Pressable>
  );
}

export default memo(AttendanceCard);
