import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmModal from "@shared/components/ConfirmModal";
import { TrashIcon } from "@shared/icons";
import { stamp } from "@shared/utils/helpers/leaves";
import { requestLabel, requestLine, STATUS } from "@shared/utils/helpers/tools";
import { c } from "@theme/colors";
import { styles } from "./RequestRow.styles";
import type { RequestRowProps } from "./RequestRow.types";

// Sorğularım sətri: növ, alət · miqdar, vaxt + kim cavab verib + səbəb, vəziyyət nişanı; gözləyən İSTƏYİ geri götürmək olar (təsdiqlə). memo
function RequestRow({ req: r, onCancel }: RequestRowProps) {
  const [ask, setAsk] = useState(false);
  const s = STATUS[r.status] ?? STATUS.pending;
  const sending = r.id < 0;
  return (
    <View style={[styles.row, sending && styles.sending]}>
      <View style={styles.text}>
        <Text style={styles.kind}>{requestLabel(r)}</Text>
        <Text style={styles.name} numberOfLines={2}>{r.tool_name} <Text style={styles.line}>· {requestLine(r)}</Text></Text>
        <Text style={styles.meta} numberOfLines={2}>{stamp(r.created_at)}{r.decided_by_name ? ` · ${r.decided_by_name}` : ""}{r.decision_note ? ` · “${r.decision_note}”` : ""}</Text>
      </View>
      <View style={styles.side}>
        <Text style={[styles.status, { color: s.fg, backgroundColor: s.bg }]}>{sending ? "Göndərilir" : s.text}</Text>
        {r.status === "pending" && r.type === "request" && !sending ? (
          <Pressable onPress={() => setAsk(true)} hitSlop={8} style={styles.x} accessibilityLabel="İstəyi geri götür"><TrashIcon size={15} color={c.danger} /></Pressable>
        ) : null}
      </View>
      {ask ? <ConfirmModal title="İstək geri götürülsün?" icon={TrashIcon} confirmTitle="Geri götür" danger onClose={() => setAsk(false)} text="İstək ləğv olunacaq." onConfirm={() => onCancel(r)} /> : null}
    </View>
  );
}

export default memo(RequestRow);
