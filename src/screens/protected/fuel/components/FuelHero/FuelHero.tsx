import { Pressable, Text, View } from "react-native";
import { ChevronLeftIcon, ChevronRightIcon, FuelIcon } from "@shared/icons";
import { PERIOD_LABEL } from "@shared/utils/fuel";
import { c } from "@theme/colors";
import type { FuelPeriod } from "@typings/fuel";
import { styles } from "./FuelHero.styles";
import type { FuelHeroProps } from "./FuelHero.types";

const PERIODS: FuelPeriod[] = ["day", "week", "month"];

// Maşın (nömrə, model, yanacaq · sərf · qiymət) + dövr seçimi (Gün | Həftə | Ay) və ‹ tarix › — gələcəyə keçmir
function FuelHero({ f }: FuelHeroProps) {
  const car = f.car;
  const per100 = car?.fuel_per_100;
  const details = `${f.fuelName ?? "yanacaq seçilməyib"} · ${per100 ? `${per100} L/100 km` : "sərf yazılmayıb"} · ${f.price ? `${f.price} ₼/L` : "qiymət yox"}`;
  return (
    <View style={styles.wrap}>
      <View style={styles.car}>
        <View style={styles.tile}><FuelIcon size={22} color={c.orange} /></View>
        <View style={styles.carText}>
          <View style={styles.plateRow}>
            {car?.car_plate ? <Text style={styles.plate}>{car.car_plate}</Text> : null}
            <Text style={styles.model} numberOfLines={1}>{car?.car_model ?? "Maşın"}</Text>
          </View>
          <Text style={styles.details} numberOfLines={1}>{details}</Text>
        </View>
      </View>
      <View style={styles.tabs}>
        {PERIODS.map((p) => (
          <Pressable key={p} onPress={() => f.choosePeriod(p)} style={[styles.tab, f.period === p && styles.tabOn]}>
            <Text style={[styles.tabText, f.period === p && styles.tabTextOn]}>{PERIOD_LABEL[p]}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.nav}>
        <Pressable onPress={() => f.shift(-1)} hitSlop={8} style={styles.arrow} accessibilityLabel="Əvvəlki">
          <ChevronLeftIcon size={18} color={c.ink} />
        </Pressable>
        <Text style={styles.label}>{f.range.label}</Text>
        <Pressable onPress={() => f.shift(1)} disabled={f.atEnd} hitSlop={8} style={[styles.arrow, f.atEnd && styles.off]} accessibilityLabel="Sonrakı">
          <ChevronRightIcon size={18} color={c.ink} />
        </Pressable>
      </View>
    </View>
  );
}

export default FuelHero;
