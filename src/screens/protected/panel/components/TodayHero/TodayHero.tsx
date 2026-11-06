import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { CalendarCheckIcon, LogInIcon, LogOutIcon } from "@shared/icons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Button from "@shared/components/Button";
import GradientBg from "@shared/components/GradientBg";
import { presenceView } from "@shared/utils/presence";
import useMyDay from "@screens/protected/panel/hooks/useMyDay";
import PulseGlow from "@screens/protected/panel/components/PulseGlow";
import SessionList from "@screens/protected/panel/components/SessionList";
import WorkRing from "@screens/protected/panel/components/WorkRing";
import { c, gradients } from "@theme/colors";
import type { PanelStackParamList } from "@typings/navigation";
import { TONE, styles } from "./TodayHero.styles";
import type { TodayHeroProps } from "./TodayHero.types";

// Bu gün (hero): iş vaxtı halqası (canlı sayır), vəziyyət, tək əsas düymə (optimistik: klik anında dəyişir).
// Sağ üst küncdə Davamiyyət keçidi
function TodayHero({ employeeId }: TodayHeroProps) {
  const { day, run } = useMyDay(employeeId);
  const view = day ? presenceView(day) : null;
  const tone = view ? TONE[view.tone] : TONE.idle;
  const nav = useNavigation<NavigationProp<PanelStackParamList>>();

  return (
    <View style={styles.card}>
      <GradientBg colors={gradients.hero} radius={24} />
      {view?.tone === "working" && <PulseGlow color={c.ok} />}
      <Pressable onPress={() => nav.navigate("Attendance")} hitSlop={8} accessibilityLabel="Davamiyyət"
        style={({ pressed }) => [styles.corner, pressed && styles.cornerPressed]}>
        <CalendarCheckIcon size={18} color={c.ink} />
      </Pressable>
      {!day || !view ? (
        <ActivityIndicator color={c.muted} style={styles.loader} />
      ) : (
        <Animated.View entering={FadeIn.duration(350)} style={styles.body}>
          <View style={styles.row}>
            <WorkRing sessions={day.sessions} live={view.tone === "working"} />
            <View style={styles.info}>
              <View style={[styles.chip, { backgroundColor: tone.bg }]}>
                <View style={[styles.dot, { backgroundColor: tone.fg }]} />
                <Text style={[styles.chipText, { color: tone.fg }]}>{view.label}</Text>
              </View>
              <Text style={styles.sub}>{view.sub}</Text>
              {day.sessions.length > 1 && <Text style={styles.meta}>{day.sessions.length} seans</Text>}
            </View>
          </View>
          {view.action && (
            <Button
              title={view.action.title}
              icon={view.action.action === "out" ? LogOutIcon : LogInIcon}
              variant={view.action.primary ? "gradient" : "glass"}
              onPress={() => run(view.action!.action)}
            />
          )}
          {day.sessions.length > 1 && <SessionList sessions={day.sessions} />}
        </Animated.View>
      )}
    </View>
  );
}

export default TodayHero;
