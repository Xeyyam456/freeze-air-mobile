import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmModal from "@shared/components/ConfirmModal";
import { CheckIcon, PackageIcon, WrenchIcon } from "@shared/icons";
import { stamp } from "@shared/utils/helpers/leaves";
import { showQty, unitOf } from "@shared/utils/helpers/tools";
import { c } from "@theme/colors";
import { styles } from "./ConfirmRow.styles";
import type { ConfirmRowProps } from "./ConfirmRow.types";

// "Sənə verildi: təsdiqlə": əlinə çatıbsa «Aldım», çatmayıbsa «Almadım» (təsdiqlə; depo məsulu yoxlayır). «Aldım» klikdə dərhal işləyir
function ConfirmRow({ hold: h, onConfirm }: ConfirmRowProps) {
  const [ask, setAsk] = useState(false);
  const t = h.tools;
  if (!t) return null;
  const material = t.kind === "material";
  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <View style={styles.tile}>{material ? <PackageIcon size={18} color={c.ok} /> : <WrenchIcon size={18} color={c.primary} />}</View>
        <View style={styles.text}>
          <Text style={styles.name} numberOfLines={2}>{t.name}</Text>
          <Text style={styles.meta}>{showQty(h.quantity, unitOf(t), t)} · {stamp(h.taken_at)}{h.disputed_at ? " · «Almadım» dedin" : ""}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => onConfirm(h, true)} style={[styles.btn, styles.yes]} accessibilityLabel="Aldım"><CheckIcon size={16} color={c.white} /><Text style={styles.yesText}>Aldım</Text></Pressable>
        {!h.disputed_at ? <Pressable onPress={() => setAsk(true)} style={[styles.btn, styles.no]} accessibilityLabel="Almadım"><Text style={styles.noText}>Almadım</Text></Pressable> : null}
      </View>
      {ask ? (
        <ConfirmModal title="Almamısan?" icon={WrenchIcon} confirmTitle="Bəli, almamışam" danger onClose={() => setAsk(false)}
          text="Depo məsulu yoxlayacaq. Sonra yenə «Aldım» basa bilərsən." onConfirm={() => onConfirm(h, false)} />
      ) : null}
    </View>
  );
}

export default memo(ConfirmRow);
