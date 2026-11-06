import { Briefcase, CalendarDays, ClipboardCheck, Wrench } from "lucide-react-native";
import { Text, View } from "react-native";
import { c } from "@theme/colors";
import { styles } from "./StatTiles.styles";
import type { StatTileProps, StatTilesProps } from "./StatTiles.types";

// Bir göstərici: rəngli ikon plitəsi, iri rəqəm, başlıq, alt yazı
function Tile({ icon: Icon, color, bg, value, label, sub }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <View style={[styles.icon, { backgroundColor: bg }]}><Icon size={18} color={color} /></View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {sub && <Text style={styles.sub} numberOfLines={1}>{sub}</Text>}
    </View>
  );
}

// 4 rəngli göstərici (2×2): bu gün, bu ay, tapşırıq, məndə. Yüklənməyibsə "–"
function StatTiles({ stats }: StatTilesProps) {
  const v = (n: number | undefined) => (n === undefined ? "–" : String(n));
  return (
    <View style={styles.grid}>
      <Tile icon={Briefcase} color={c.primary} bg={c.primarySoft} value={v(stats?.today)} label="Bu gün işlərim" />
      <Tile icon={CalendarDays} color={c.ok} bg={c.okSoft} value={v(stats?.month)} label="Bu ay" />
      <Tile
        icon={ClipboardCheck}
        color={c.orange}
        bg={c.orangeSoft}
        value={stats ? `${stats.tasks.done}/${stats.tasks.total}` : "–"}
        label="Tapşırıq"
        sub={stats ? (stats.tasks.total === stats.tasks.done ? "hamısı görülüb" : `${stats.tasks.total - stats.tasks.done} qalıb`) : undefined}
      />
      <Tile
        icon={Wrench}
        color={c.violet}
        bg={c.violetSoft}
        value={v(stats?.tools)}
        label="Məndə alət"
        sub={stats ? `${stats.materials} material` : undefined}
      />
    </View>
  );
}

export default StatTiles;
