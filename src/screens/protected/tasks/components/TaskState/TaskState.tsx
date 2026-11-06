import { Text, View } from "react-native";
import { ArrowRightIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./TaskState.styles";
import type { TaskStateProps } from "./TaskState.types";

// Vəziyyət nişanı: geri alınıb (→ yeni usta) / görüldü / görülmədi (keçmiş gün) / gözləyir
function TaskState({ task, past }: TaskStateProps) {
  if (task.cancelled_at) {
    return (
      <View style={[styles.chip, { backgroundColor: c.glass }]}>
        <Text style={[styles.text, { color: c.muted }]}>Geri alınıb</Text>
        {task.nextName && <ArrowRightIcon size={12} color={c.muted} />}
        {task.nextName && <Text style={[styles.text, { color: c.muted }]} numberOfLines={1}>{task.nextName}</Text>}
      </View>
    );
  }
  const [text, fg, bg] = task.done ? ["Görüldü", c.ok, c.okSoft]
    : past ? ["Görülmədi", c.danger, c.dangerSoft]
    : ["Gözləyir", c.orange, c.orangeSoft];
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: fg }]}>{text}</Text>
    </View>
  );
}

export default TaskState;
