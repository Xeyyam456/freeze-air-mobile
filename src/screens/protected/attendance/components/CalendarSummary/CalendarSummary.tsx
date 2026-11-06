import { Text, View } from "react-native";
import { c } from "@theme/colors";
import { styles } from "./CalendarSummary.styles";
import type { CalendarSummaryProps } from "./CalendarSummary.types";

// Ayın xülasəsi (web CalendarSummary): iş günü, işdə, icazəli, gəlmədi + bazar günü işi
function CalendarSummary({ summary: s }: CalendarSummaryProps) {
  const items = [
    { label: "İş günü", value: s.workdays, color: c.ink },
    { label: "İşdə", value: s.present, color: c.ok },
    { label: "İcazəli", value: s.leave, color: c.violet },
    { label: "Gəlmədi", value: s.absent, color: s.absent ? c.danger : c.ink },
  ];
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {items.map((x) => (
          <View key={x.label} style={styles.cell}>
            <Text style={[styles.value, { color: x.color }]}>{x.value}</Text>
            <Text style={styles.label}>{x.label}</Text>
          </View>
        ))}
      </View>
      {s.extra > 0 ? (
        <View style={styles.row}>
          <View style={[styles.pill, styles.sunday]}>
            <Text style={styles.sundayText}>Bazar günü işdə</Text>
            <Text style={[styles.pillValue, styles.sundayText]}>{s.extra}</Text>
          </View>
          <View style={[styles.pill, styles.total]}>
            <Text style={styles.totalText}>Cəmi işdə</Text>
            <Text style={[styles.pillValue, styles.totalText]}>{s.present + s.extra}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.none}>Bazar günü işdə olmayıb</Text>
      )}
    </View>
  );
}

export default CalendarSummary;
