import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PackageIcon, WrenchIcon } from "@shared/icons";
import { stamp } from "@shared/utils/leaves";
import { personCounts, showQty, unitOf } from "@shared/utils/tools";
import ToolTabs from "@screens/protected/tools/components/ToolTabs";
import { c } from "@theme/colors";
import type { ToolKind } from "@typings/tools";
import { styles } from "./PersonItems.styles";
import type { PersonItemsProps } from "./PersonItems.types";

// Ustanın üzərindəkilər (yalnız baxış): alətlər | materiallar, hər biri ad + nə vaxtdan + miqdar
function PersonItems({ person: p }: PersonItemsProps) {
  const insets = useSafeAreaInsets();
  const n = personCounts(p);
  const [kind, setKind] = useState<ToolKind>(n.tools || !n.mats ? "tool" : "material");
  const list = p.items.filter((h) => (h.tools?.kind === "material" ? "material" : "tool") === kind);
  return (
    <View style={styles.flex}>
      <View style={styles.pad}><ToolTabs value={kind} onChange={setKind} tools={p.items.filter((h) => h.tools?.kind !== "material").length} materials={n.mats} /></View>
      <ScrollView contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
        {list.map((h) => {
          const t = h.tools;
          const days = Math.floor((Date.now() - new Date(h.taken_at).getTime()) / 86400000);
          return (
            <View key={h.id} style={styles.row}>
              <View style={styles.tile}>{t?.kind === "material" ? <PackageIcon size={18} color={c.ok} /> : <WrenchIcon size={18} color={c.primary} />}</View>
              <View style={styles.text}>
                <Text style={styles.name} numberOfLines={2}>{t?.name ?? "—"}</Text>
                <Text style={styles.meta}>götürüb {stamp(h.taken_at)} · {days <= 0 ? "bu gün" : `${days} gün`}</Text>
              </View>
              <Text style={styles.qty}>{t ? showQty(h.quantity, unitOf(t), t) : h.quantity}</Text>
            </View>
          );
        })}
        {!list.length ? <Text style={styles.empty}>{kind === "tool" ? "Alət yoxdur" : "Material yoxdur"}</Text> : null}
      </ScrollView>
    </View>
  );
}

export default PersonItems;
