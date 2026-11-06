import { Text, View } from "react-native";
import MonthTrend from "@screens/protected/panel/components/MonthTrend";
import PanelHeader from "@screens/protected/panel/components/PanelHeader";
import StatStrip from "@screens/protected/panel/components/StatStrip";
import TodayHero from "@screens/protected/panel/components/TodayHero";
import TopPlaces from "@screens/protected/panel/components/TopPlaces";
import { styles } from "./PanelDashboard.styles";
import type { PanelDashboardProps } from "./PanelDashboard.types";

// Panelin yuxarı hissəsi (FlashList başlığı): salam → bu gün (halqa) → 3 rəqəm → ayın trendi → top yerlər → işlər başlığı
function PanelDashboard({ name, email, photo, employeeId, day, stats, overview, logsCount }: PanelDashboardProps) {
  return (
    <View style={styles.wrap}>
      <PanelHeader name={name || email} photo={photo} day={day} />
      {employeeId ? (
        <>
          <TodayHero employeeId={employeeId} />
          <StatStrip stats={stats} overview={overview} />
          {overview && <MonthTrend overview={overview} />}
          {overview && <TopPlaces places={overview.places} />}
        </>
      ) : (
        <Text style={styles.note}>Hesabına əməkdaş kartı bağlı deyil.</Text>
      )}
      <View style={styles.section}>
        <Text style={styles.title}>Bu gün</Text>
        <Text style={styles.count}>{logsCount ?? 0} iş · hamı</Text>
      </View>
    </View>
  );
}

export default PanelDashboard;
