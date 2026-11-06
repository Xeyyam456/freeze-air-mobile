import { LogIn, LogOut } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";
import Button from "@shared/components/Button";
import Pill from "@shared/components/Pill";
import { durShort, mins, timeBaku } from "@shared/utils/time";
import { c } from "@theme/colors";
import { styles } from "./PresenceActions.styles";
import type { PresenceActionsProps } from "./PresenceActions.types";

// Bu günün davamiyyəti (web PresenceActions ilə eyni məntiq):
// "İşə gəldim" → "İşdəsən · 09:02-dən" + "İşi bitirdim" → "İşi bitirdin · 09:02 – 18:10" + "Yenidən işə çıxdım"
function PresenceActions({ day, onAction }: PresenceActionsProps) {
  if (!day) return <ActivityIndicator color={c.muted} />;
  const s = day.sessions;
  const last = s[s.length - 1];
  const total = s.reduce((m, x) => m + (x.out ? mins(x.in, x.out) : 0), 0);

  if (day.status === "absent") return <Pill text="Bu gün işdə olmayıb qeyd olunub" color={c.danger} bg={c.dangerSoft} />;
  if (day.status === "pending") return <Button title="İşə gəldim" icon={LogIn} variant="ok" onPress={() => onAction("in")} />;

  if (day.status === "present" && last && !last.out) {
    const since = s.length > 1 ? `${timeBaku(last.in)}-dən` : `${timeBaku(s[0].in)}-dən`;
    return (
      <View style={styles.col}>
        <Pill text={`İşdəsən · ${since}`} color={c.ok} bg={c.okSoft} />
        <Button title="İşi bitirdim" icon={LogOut} variant="navy" onPress={() => onAction("out")} />
      </View>
    );
  }
  if (day.status === "present" && last) {
    const text = s.length > 1 ? `İşi bitirdin · ${durShort(total)}` : `İşi bitirdin · ${timeBaku(s[0].in)} – ${timeBaku(last.out!)}`;
    return (
      <View style={styles.col}>
        <Pill text={text} color={c.ink} bg={c.surface2} />
        {/* Təcili iş çıxsa: yeni seans açılır, gün bir dəfə sayılır */}
        <Button title="Yenidən işə çıxdım" icon={LogIn} variant="soft" onPress={() => onAction("in")} />
      </View>
    );
  }
  if (day.status === "leave") {
    return (
      <View style={styles.col}>
        <Pill text="Bu gün icazəlisən" color={c.violet} bg={c.violetSoft} />
        <Button title="İcazəyə ehtiyac qalmadı, işdəyəm" icon={LogIn} variant="soft" onPress={() => onAction("giveUpLeave")} />
      </View>
    );
  }
  // Bazar iş günü deyil, amma çağırılıbsa işə çıxdığını qeyd edə bilər (əlavə gün)
  return (
    <View style={styles.col}>
      <Pill text="Bazar: iş günü deyil" color={c.muted} bg={c.surface2} />
      <Button title="Bazar günü işdəyəm" icon={LogIn} variant="soft" onPress={() => onAction("in")} />
    </View>
  );
}

export default PresenceActions;
